import { buffer } from 'micro';
import Cors from 'micro-cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';
import Stripe from 'stripe';
import stripeInstance from '@/lib/stripe';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripeInstance.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      const purchaseType = session.metadata?.type;

      if (userId) {
        if (purchaseType === 'credits') {
          await prisma.user.update({
            where: { id: userId },
            data: { credits: { increment: 10 } },
          });
        } else if (purchaseType === 'premium') {
          await prisma.user.update({
            where: { id: userId },
            data: { tier: 'PREMIUM', credits: { increment: 30 } },
          });
        }
      } else {
        console.error('User ID is null in the Stripe session');
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default cors(webhookHandler as any);