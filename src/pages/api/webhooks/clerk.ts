import { NextApiRequest, NextApiResponse } from 'next';
import { Webhook, WebhookRequiredHeaders } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';
import prisma from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: 'Error occurred -- no svix headers' });
  }

  const payload = await buffer(req);
  const body = payload.toString();

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({ error: 'Error occurred' });
  }

  // Handle the event
  const eventType = evt.type;
  if (eventType === 'user.created') {
    const { id, email_addresses } = evt.data;
    const emailObject = email_addresses[0];
    
    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          // Remove the email field if it's not in your Prisma schema
          // email: emailObject.email_address,
          credits: 3,
          tier: 'FREE'
        },
      });
      console.log(`User created with Clerk ID: ${id}`);
    } catch (error) {
      console.error('Error creating user in database:', error);
    }
  }

  res.status(200).json({ success: true });
}

// This helper function is used to parse the incoming request body
async function buffer(req: NextApiRequest) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}