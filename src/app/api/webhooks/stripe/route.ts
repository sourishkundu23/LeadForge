import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@/lib/supabase';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'placeholder-stripe-key';
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2026-01-28' as any,
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Dev mode: parse body directly if webhookSecret is not set
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return NextResponse.json(
      { error: `Webhook Error: ${(err as Error).message}` },
      { status: 400 }
    );
  }

  const supabase = createServerClient();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerEmail = session.customer_details?.email || session.customer_email;
        const metadataUserId = session.metadata?.user_id;

        // Plan credits mapping
        const amountTotal = session.amount_total || 0; // in cents
        let plan = 'starter';
        let creditsToSet = 500;

        if (amountTotal >= 14900) {
          plan = 'agency';
          creditsToSet = 10000;
        } else if (amountTotal >= 7900) {
          plan = 'growth';
          creditsToSet = 20000;
        }

        // Find user by ID or Email
        if (metadataUserId) {
          await supabase
            .from('users')
            .update({
              plan,
              credits_remaining: creditsToSet,
              credits_monthly_limit: creditsToSet,
              stripe_customer_id: session.customer as string,
              updated_at: new Date().toISOString(),
            })
            .eq('id', metadataUserId);
        } else if (customerEmail) {
          await supabase
            .from('users')
            .update({
              plan,
              credits_remaining: creditsToSet,
              credits_monthly_limit: creditsToSet,
              stripe_customer_id: session.customer as string,
              updated_at: new Date().toISOString(),
            })
            .eq('email', customerEmail);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        const stripeCustomerId = subscription.customer as string;

        if (subscription.status === 'active') {
          await supabase
            .from('users')
            .update({
              updated_at: new Date().toISOString(),
            })
            .eq('stripe_customer_id', stripeCustomerId);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Error handling Stripe webhook event:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
