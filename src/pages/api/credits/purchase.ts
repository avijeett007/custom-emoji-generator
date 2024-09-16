import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const emojis = await prisma.emoji.findMany();
      res.status(200).json(emojis);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch emojis' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}