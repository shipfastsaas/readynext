# Stripe Integration Setup

To enable Stripe payments in your ShipFast application, you'll need to set up the following environment variables:

```env
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Instructions

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Install the Stripe CLI to test webhooks locally
4. Run `stripe listen --forward-to localhost:3000/api/webhooks` to forward webhook events
5. Add the webhook signing secret to your environment variables

## Testing

Use these test card numbers:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

## Webhook Events

The webhook endpoint handles these events:
- checkout.session.completed
- payment_intent.succeeded
- payment_intent.payment_failed

## Price Configuration

The starter kit is priced at $199 (19900 cents in Stripe). You can modify this in the checkout API route.
