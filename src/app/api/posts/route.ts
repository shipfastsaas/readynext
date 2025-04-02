import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Post from '@/models/Post'
import { saveBase64Image, getImageTypeFromBase64 } from '@/utils/image-utils'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'

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
      console.log('Connected to database, fetching posts...')
      
      // Récupérer les vrais articles de blog depuis MongoDB
      const posts = await Post.find({}).sort({ createdAt: -1 })
      
      console.log(`Found ${posts.length} posts in database`)
      
      return NextResponse.json(posts)
    } catch (dbError) {
      console.error('Database connection failed, using mock data:', dbError)
      
      // Données fictives à utiliser lorsque la base de données n'est pas disponible
      const mockPosts = [
        {
          _id: '1',
          title: 'Comment déployer votre SaaS sur Vercel',
          content: 'Contenu détaillé sur le déploiement de SaaS...',
          excerpt: 'Un guide étape par étape pour déployer votre application SaaS sur Vercel',
          featuredImage: '/img-blog/default-post-image.jpg',
          status: 'published',
          createdAt: new Date('2025-02-15'),
          updatedAt: new Date('2025-02-15')
        },
        {
          _id: '2',
          title: 'Optimisation SEO pour applications Next.js',
          content: 'Stratégies d\'optimisation SEO pour Next.js...',
          excerpt: 'Découvrez comment améliorer le référencement de votre application Next.js',
          featuredImage: '/img-blog/default-post-image.jpg',
          status: 'published',
          createdAt: new Date('2025-02-10'),
          updatedAt: new Date('2025-02-10')
        },
        {
          _id: '3',
          title: 'Internationalisation avec next-intl',
          content: 'Guide complet d\'internationalisation...',
          excerpt: 'Comment rendre votre application accessible dans plusieurs langues',
          featuredImage: '/img-blog/default-post-image.jpg',
          status: 'published',
          createdAt: new Date('2025-02-05'),
          updatedAt: new Date('2025-02-05')
        }
      ];
      
      return NextResponse.json(mockPosts)
    }
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    // Pour le débogage, nous allons permettre la création d'articles sans authentification
    // Dans un environnement de production, vous devriez décommenter ces lignes
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }

    await dbConnect()
    
    const data = await request.json()
    
    // Vérifier que les champs requis sont présents
    if (!data.title || !data.content || !data.excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Gérer l'image principale
    let featuredImagePath = '/img-blog/default-post-image.jpg'; // Image par défaut
    if (data.featuredImage) {
      console.log('Processing featured image...');
      try {
        // Si l'image est une URL data (base64), la traiter
        if (data.featuredImage.startsWith('data:')) {
          console.log('Image is base64 data, processing...');
          const imageType = getImageTypeFromBase64(data.featuredImage);
          console.log(`Detected image type: ${imageType}`);
          const fileName = `post-image-${Date.now()}.${imageType}`;
          
          // Sauvegarder l'image et obtenir le chemin
          console.log(`Attempting to save image with filename: ${fileName}`);
          featuredImagePath = await saveBase64Image(data.featuredImage, fileName);
          console.log(`Image processing complete. Path: ${featuredImagePath}`);
        } else {
          // Si c'est déjà une URL, l'utiliser directement
          console.log('Image is already a URL, using directly');
          featuredImagePath = data.featuredImage;
        }
      } catch (error) {
        console.error('Error processing image:', error);
        // Utiliser l'image par défaut en cas d'erreur
        console.log('Using default image due to error');
      }
    } else {
      console.log('No featured image provided, using default');
    }
    
    // Créer un nouvel article
    const newPost = new Post({
      title: data.title,
      content: data.content,
      excerpt: data.excerpt,
      featuredImage: featuredImagePath,
      status: data.status || 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    
    // Sauvegarder l'article dans la base de données
    await newPost.save()
    
    console.log('New post created:', newPost._id)
    
    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Failed to create post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
