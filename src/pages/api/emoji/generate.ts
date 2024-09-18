import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files, File } from 'formidable';
import { fal } from "@/lib/fal";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface FalResponse {
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

    const form = new IncomingForm();
    const [fields, files] = await new Promise<[Fields, Files]>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    const file = (files.file as File[])?.[0];
    const emotion = (fields.emotion as string[])?.[0];

    if (!file || !emotion) {
      return res.status(400).json({ error: 'Missing file or emotion' });
    }

    // Read file content
    const fileContent = await fs.readFile(file.filepath);

    // Upload file to FAL
    const imageUrl = await fal.storage.upload(new Blob([fileContent]));

    // Generate emoji
    const result = await fal.subscribe("fal-ai/face-to-sticker", {
      input: {
        image_url: imageUrl,
        prompt: emotion,
        image_size: "square",
        num_inference_steps: 20,
        guidance_scale: 7.5,
      },
    }) as FalResponse; // Type assertion here

    // Decrease credits for non-premium users
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 1 } },
      select: { credits: true, tier: true },
    });

    res.status(200).json({
      message: 'Emoji generated successfully',
      sticker_image: result.sticker_image,
      sticker_image_background_removed: result.sticker_image_background_removed,
      creditsRemaining: updatedUser.tier === 'PREMIUM' ? 'Unlimited' : updatedUser.credits,
    });
  } catch (error) {
    console.error('Error generating emoji:', error);
    res.status(500).json({ error: 'Failed to generate emoji' });
  }
}