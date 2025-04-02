import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { sendPurchaseConfirmationEmail } from '@/services/email-service'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('Stripe-Signature') as string

  let event

  try {
    event = await stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object

      // Verify the payment and grant access
      if (session.payment_status === 'paid') {
        console.log('Paiement confirmé, envoi de l\'email de confirmation...')
        
        try {
          // Récupérer les informations du client depuis la session
          const customerEmail = session.customer_details?.email
          const customerName = session.customer_details?.name || 'Valued Customer'
          
          // Récupérer les informations du produit
          const productName = 'ShipFast Starter Kit'
          const amount = new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'USD'
          }).format(session.amount_total ? session.amount_total / 100 : 199)
          
          // Lien vers le repo GitHub du template
          const githubLink = 'https://github.com/shipfaststarter/template'
          
          if (customerEmail) {
            // Envoyer l'email de confirmation d'achat
            const emailResult = await sendPurchaseConfirmationEmail({
              customerEmail,
              customerName,
              productName,
              githubLink,
              amount
            })
            
            if (emailResult.success) {
              console.log(`Email de confirmation envoyé à ${customerEmail}`)
            } else {
              console.error(`Échec de l'envoi de l'email à ${customerEmail}:`, emailResult.error)
            }
          } else {
            console.error('Email du client non disponible dans la session Stripe')
          }
        } catch (error) {
          console.error('Erreur lors du traitement de la confirmation d\'achat:', error)
        }
      }
      break
    }

    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      console.log('Payment Intent succeeded:', paymentIntent.id)
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object
      console.log('Payment Intent failed:', paymentIntent.id)
      break
    }

    default: {
      console.log(`Unhandled event type ${event.type}`)
    }
  }

  return NextResponse.json({ received: true })
}
