import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Récupérer les identifiants envoyés
    const { email, password } = await request.json()

    // Vérifier les identifiants par rapport aux variables d'environnement
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: 'Configuration admin manquante' },
        { status: 500 }
      )
    }

    // Vérifier si les identifiants correspondent
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    // Créer la réponse
    const response = NextResponse.json({ 
      success: true,
      message: 'Authentification réussie' 
    })

    // Définir un cookie simple pour l'authentification admin
    response.cookies.set({
      name: 'admin-auth',
      value: 'authenticated',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 jour
      path: '/',
      sameSite: 'lax',
    })

    console.log('Cookie admin-auth défini avec succès')
    
    return response
  } catch (error) {
    console.error('Erreur d\'authentification admin:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
