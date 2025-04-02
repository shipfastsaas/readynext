import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Temporairement désactivé pour le débogage
    // const session = await auth()
    // if (!session) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    // Récupérer les vrais paiements depuis Stripe
    const charges = await stripe.charges.list({
      limit: 100, // Nombre de paiements à récupérer
      expand: ['data.customer'], // Inclure les informations du client
    })

    // Transformer les données Stripe en format attendu par le frontend
    const payments = charges.data.map(charge => ({
      id: charge.id,
      amount: charge.amount,
      status: charge.status,
      email: charge.billing_details.email || 'N/A',
      date: new Date(charge.created * 1000).toISOString(), // Convertir le timestamp Unix en ISO string
      currency: charge.currency
    }))

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}
