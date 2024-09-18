import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cronSecret = req.headers['x-cron-secret'];

  if (cronSecret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await prisma.user.updateMany({
      where: { tier: 'PREMIUM' },
      data: { credits: 50 }
    });

    res.status(200).json({ message: 'Premium user credits reset successfully' });
  } catch (error) {
    console.error('Error resetting premium user credits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}