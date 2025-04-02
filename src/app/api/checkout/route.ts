import { NextResponse } from 'next/server'
import { stripe, SUCCESS_URL, CANCEL_URL } from '@/lib/stripe'

export async function POST() {
  try {
    // Vérifier les variables d'environnement nécessaires
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable');
      return NextResponse.json(
        { error: 'Server configuration error: Missing Stripe key' },
        { status: 500 }
      );
    }

    if (!process.env.NEXT_PUBLIC_APP_URL) {
      console.error('Missing NEXT_PUBLIC_APP_URL environment variable');
      return NextResponse.json(
        { error: 'Server configuration error: Missing app URL' },
        { status: 500 }
      );
    }

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ShipFast Starter Kit',
              description: 'Complete Next.js SaaS starter kit with authentication, payments, and more.',
              images: [`${process.env.NEXT_PUBLIC_APP_URL}/og.png`],
            },
            unit_amount: 19900, // $199.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      metadata: {
        productType: 'starter_kit',
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    
    // Fournir des informations d'erreur plus détaillées
    const errorMessage = error.message || 'Unknown error';
    const errorType = error.type || 'unknown_type';
    const errorCode = error.statusCode || 500;
    
    return NextResponse.json(
      { 
        error: 'Stripe Error', 
        message: errorMessage,
        type: errorType 
      },
      { status: errorCode }
    )
  }
}
