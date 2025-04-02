import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Temporairement désactivé pour le débogage
    // const session = await auth()
    // if (!session?.user) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    await dbConnect()
    const users = await User.find({}, { password: 0 })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
