import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
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

    const emojis = await prisma.emoji.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(emojis);
  } catch (error) {
    console.error('Error fetching emojis:', error);
    res.status(500).json({ error: 'Failed to fetch emojis' });
  }
}