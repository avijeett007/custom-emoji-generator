// src/pages/api/emoji/public.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const publicEmojis = await prisma.emoji.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: 12, // Limit to 12 emojis for the showcase
    });

    res.status(200).json(publicEmojis);
  } catch (error) {
    console.error('Error fetching public emojis:', error);
    res.status(500).json({ error: 'Failed to fetch public emojis' });
  }
}