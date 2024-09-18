// src/pages/api/credits/purchase.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import prisma from '@/lib/db';
import stripe from '@/lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { userId } = getAuth(req);
    console.log('Clerk userId:', userId);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { type } = req.body;
    console.log('Purchase type:', type);

    if (!type || (type !== 'credits' && type !== 'premium')) {
      return res.status(400).json({ error: 'Invalid purchase type' });
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    console.log('User from database:', user);

    if (!user) {
      // If user doesn't exist in our database, create a new user
      user = await prisma.user.create({
        data: {
          clerkId: userId,
          tier: 'FREE',
          credits: 3, // Starting credits for new users
        },
      });
      console.log('New user created:', user);
    }

    let session;
    if (type === 'credits') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_CREDIT_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/dashboard`,
        client_reference_id: user.id,
        metadata: { type: 'credits' },
      });
    } else {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PREMIUM_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/dashboard`,
        client_reference_id: user.id,
        metadata: { type: 'premium' },
      });
    }

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error processing purchase:', error);
    res.status(500).json({ error: 'Failed to process purchase' });
  }
}