import type { NextApiRequest, NextApiResponse } from 'next'
import { fal } from "@/lib/fal";

interface FalResponse {
  sticker_image: {
    url: string;
  };
  sticker_image_background_removed: {
    url: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { image_url, prompt } = req.body;

      const result = await fal.subscribe("fal-ai/face-to-sticker", {
        input: {
          image_url,
          prompt,
        },
      });

      // Type assertion
      const typedResult = result as FalResponse;

      res.status(200).json({ 
        message: 'Emoji generated successfully',
        sticker_image: typedResult.sticker_image,
        sticker_image_background_removed: typedResult.sticker_image_background_removed
      })
    } catch (error) {
      console.error('Error generating emoji:', error);
      res.status(500).json({ error: 'Failed to generate emoji' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}