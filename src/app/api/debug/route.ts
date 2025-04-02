import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import dbConnect from '@/lib/db'

const getConnectionStateString = (state: number): string => {
  switch (state) {
    case 0: return 'disconnected'
    case 1: return 'connected'
    case 2: return 'connecting'
    case 3: return 'disconnecting'
    default: return 'unknown'
  }
}

export async function GET() {
  try {
    // Tenter une connexion
    console.log('Debug endpoint: Attempting connection...')
    await dbConnect()
    
    // Vérifier l'état de la connexion MongoDB
    const connectionState = mongoose.connection.readyState
    const mongoStatus = {
      MONGODB_URI_defined: !!process.env.MONGODB_URI,
      MONGODB_URI_length: process.env.MONGODB_URI?.length || 0,
      MONGODB_URI_starts_with: process.env.MONGODB_URI?.startsWith('mongodb'),
      connection_state: connectionState,
      connection_state_string: getConnectionStateString(connectionState),
      host: mongoose.connection.host || 'not connected',
      database_name: mongoose.connection.name || 'not connected',
    }

    // Retourner les informations de diagnostic
    return NextResponse.json({
      environment: process.env.NODE_ENV,
      mongo_status: mongoStatus,
      timestamp: new Date().toISOString(),
      node_version: process.version,
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ 
      error: 'Debug endpoint error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { 
      status: 500 
    })
  }
}
