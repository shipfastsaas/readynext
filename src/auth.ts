// src/auth.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// @ts-ignore - Ignorer les erreurs de type pour le déploiement
const handler = NextAuth(authOptions)

export const auth = handler
export const GET = handler
export const POST = handler