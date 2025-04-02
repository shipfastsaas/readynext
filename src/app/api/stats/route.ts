import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import dbConnect from '@/lib/db'
import Post from '@/models/Post'
import User from '@/models/User'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // Temporairement désactivé pour le débogage
    // const session = await auth()
    // if (!session) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    console.log('Connecting to database...')
    try {
      await dbConnect()
      console.log('Connected to database, fetching stats...')
      
      // Récupérer les données depuis MongoDB et Stripe
      const [posts, users, charges] = await Promise.all([
        Post.find({}).sort({ createdAt: -1 }).limit(10),
        User.find({}),
        stripe.charges.list({
          limit: 100,
          created: {
            // Aujourd'hui (depuis minuit)
            gte: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000)
          }
        })
      ])
      
      // Récupérer les 10 derniers paiements
      const recentPayments = (await stripe.charges.list({ limit: 10 })).data.map(charge => ({
        id: charge.id,
        amount: charge.amount,
        status: charge.status,
        email: charge.billing_details.email || 'N/A',
        date: new Date(charge.created * 1000).toISOString()
      }))
      
      // Calculer le total des revenus de la journée
      const todayRevenue = charges.data.reduce((total, charge) => {
        // Dans Stripe, le statut 'succeeded' est utilisé pour les paiements réussis
        if (charge.status === 'succeeded') {
          return total + charge.amount
        }
        return total
      }, 0)
      
      // Transformer les posts pour le format attendu
      const recentPosts = posts.map(post => ({
        id: post._id.toString(),
        title: post.title,
        status: post.status,
        date: post.createdAt.toISOString()
      }))
      
      const stats = {
        totalRevenue: todayRevenue,
        totalPosts: await Post.countDocuments({}),
        totalUsers: await User.countDocuments({}),
        recentPayments,
        recentPosts
      }
      
      console.log('Stats generated:', {
        totalRevenue: stats.totalRevenue,
        totalPosts: stats.totalPosts,
        totalUsers: stats.totalUsers,
        recentPaymentsCount: stats.recentPayments.length,
        recentPostsCount: stats.recentPosts.length
      })
      
      return NextResponse.json(stats)
    } catch (dbError) {
      console.error('Database connection failed, using mock data:', dbError)
      
      // Données fictives à utiliser lorsque la base de données n'est pas disponible
      const mockStats = {
        totalRevenue: 12500,
        totalPosts: 15,
        totalUsers: 250,
        recentPayments: [
          {
            id: 'ch_mock1',
            amount: 2900,
            status: 'succeeded',
            email: 'client1@example.com',
            date: new Date('2025-03-10T10:30:00').toISOString()
          },
          {
            id: 'ch_mock2',
            amount: 4900,
            status: 'succeeded',
            email: 'client2@example.com',
            date: new Date('2025-03-09T15:45:00').toISOString()
          },
          {
            id: 'ch_mock3',
            amount: 1900,
            status: 'succeeded',
            email: 'client3@example.com',
            date: new Date('2025-03-08T09:15:00').toISOString()
          }
        ],
        recentPosts: [
          {
            id: 'post_mock1',
            title: 'Comment déployer votre SaaS sur Vercel',
            status: 'published',
            date: new Date('2025-02-15').toISOString()
          },
          {
            id: 'post_mock2',
            title: 'Optimisation SEO pour applications Next.js',
            status: 'published',
            date: new Date('2025-02-10').toISOString()
          },
          {
            id: 'post_mock3',
            title: 'Internationalisation avec next-intl',
            status: 'published',
            date: new Date('2025-02-05').toISOString()
          }
        ]
      };
      
      return NextResponse.json(mockStats)
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
