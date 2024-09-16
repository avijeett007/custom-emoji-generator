import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Attempt to create a test user
      const user = await prisma.user.create({
        data: {
          clerkId: 'test-' + Date.now(),
          tier: 'FREE',
        },
      })

      // Fetch the created user
      const fetchedUser = await prisma.user.findUnique({
        where: { id: user.id },
      })

      res.status(200).json({ message: 'Database connection successful', user: fetchedUser })
    } catch (error) {
      console.error('Database operation failed:', error)
      res.status(500).json({ error: 'Database operation failed' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}