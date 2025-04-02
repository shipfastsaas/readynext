import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

interface GlobalMongoose {
  mongoose: {
    conn: typeof mongoose | null;
  } | null;
}

declare global {
  var mongoose: { conn: typeof mongoose | null } | null;
}

const cached = (global as unknown as GlobalMongoose).mongoose || { conn: null }

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

export default async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
  }

  if (cached.conn) {
    return cached.conn
  }

  try {
    console.log('Tentative de connexion à MongoDB avec URI:', MONGODB_URI.replace(/\/\/(.+?):.+?@/, '//\$1:***@'))
    cached.conn = await mongoose.connect(MONGODB_URI)
    console.log('MongoDB Connected')
    return cached.conn
  } catch (e) {
    console.error('MongoDB connection error:', e)
    
    // Fournir des informations de diagnostic plus détaillées
    if (e.name === 'MongoServerSelectionError') {
      console.error('Impossible de se connecter au serveur MongoDB. Vérifiez que :')
      console.error('1. Votre cluster MongoDB Atlas est actif')
      console.error('2. Votre adresse IP est autorisée dans la liste blanche de MongoDB Atlas')
      console.error('3. Votre nom d\'utilisateur et mot de passe sont corrects')
    } else if (e.code === 'ENOTFOUND' || e.code === 'ECONNREFUSED') {
      console.error('Impossible de résoudre le nom d\'hôte MongoDB. Vérifiez que :')
      console.error('1. Le nom d\'hôte dans votre chaîne de connexion est correct')
      console.error('2. Vous avez une connexion Internet active')
    }
    
    throw e
  }
}
