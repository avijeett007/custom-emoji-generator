import type { NextApiRequest, NextApiResponse } from 'next';
import { fal } from "@/lib/fal";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import { UTApi } from "uploadthing/server";
import formidable from 'formidable';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const utapi = new UTApi();

interface FalAIResponse {
  sticker_image: {
    url: string;
  };
  sticker_image_background_removed: {
    url: string;
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.credits <= 0 && user.tier !== 'PREMIUM') {
      return res.status(403).json({ error: 'Not enough credits' });
    }

    const form = formidable();
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = files.file?.[0] as formidable.File | undefined;
    const emotion = fields.emotion?.[0];

    if (!file || !emotion) {
      return res.status(400).json({ error: 'Missing file or emotion' });
    }

    // Read file content
    const fileContent = await fs.readFile(file.filepath);

    // Upload file to FAL
    const falUploadResponse = await fal.storage.upload(new Blob([fileContent]));

    // Generate emoji using FAL AI
    const result = await fal.subscribe("fal-ai/face-to-sticker", {
      input: {
        image_url: falUploadResponse,
        prompt: emotion,
        image_size: "square",
        num_inference_steps: 20,
        guidance_scale: 7.5,
      },
    }) as FalAIResponse;

    // Upload generated emoji to UploadThing
    const emojiResponse = await fetch(result.sticker_image.url);
    const emojiBlob = await emojiResponse.blob();
    const emojiFile = new File([emojiBlob], `emoji_${Date.now()}.png`, { type: 'image/png' });
    const uploadedFile = await utapi.uploadFiles([emojiFile]);

    if (!uploadedFile[0] || !uploadedFile[0].data) {
      throw new Error('Failed to upload generated emoji');
    }

    const emojiUrl = uploadedFile[0].data.url;

    // Decrease credits for non-premium users and save emoji data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { 
        credits: { decrement: 1 },
        emojis: {
          create: {
            imageUrl: emojiUrl,
            emotion: emotion,
            isPublic: user.tier === 'FREE'
          }
        }
      },
      select: { credits: true, tier: true },
    });

    res.status(200).json({
      message: 'Emoji generated and uploaded successfully',
      emojiUrl: emojiUrl,
      creditsRemaining: updatedUser.tier === 'PREMIUM' ? 'Unlimited' : updatedUser.credits,
    });
  } catch (error) {
    console.error('Error generating and uploading emoji:', error);
    res.status(500).json({ error: 'Failed to generate and upload emoji' });
  }
}