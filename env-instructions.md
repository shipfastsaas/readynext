# Instructions pour les variables d'environnement

## Variables d'environnement locales

Ajoutez cette ligne à votre fichier `.env.local` :

```
NEXTAUTH_URL=http://localhost:3000
```

## Variables d'environnement sur Vercel

Assurez-vous d'ajouter ces variables d'environnement dans les paramètres de votre projet Vercel :

1. `MONGODB_URI` - Votre URI MongoDB (déjà configuré)
2. `GOOGLE_CLIENT_ID` - Votre ID client Google (déjà configuré)
3. `GOOGLE_CLIENT_SECRET` - Votre secret client Google (déjà configuré)
4. `NEXTAUTH_SECRET` - Votre secret NextAuth (déjà configuré)
5. `NEXTAUTH_URL` - **IMPORTANT** : Ajoutez cette variable avec la valeur de l'URL de votre site déployé (par exemple, `https://votre-site.vercel.app`)
6. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Votre clé publique Stripe (déjà configuré)
7. `ADMIN_EMAIL` - Email administrateur (déjà configuré)
8. `ADMIN_PASSWORD` - Mot de passe administrateur (déjà configuré)
9. `EMAIL_SERVER_HOST` - Hôte du serveur email (déjà configuré)
10. `EMAIL_SERVER_USER` - Utilisateur du serveur email (déjà configuré)
11. `EMAIL_FROM` - Adresse d'expédition des emails (déjà configuré)

## Sécurité importante

⚠️ **ATTENTION** : Après avoir résolu vos problèmes de déploiement, il est fortement recommandé de :

1. Changer le mot de passe administrateur
2. Régénérer vos clés API (Google, SendGrid, etc.)
3. Mettre à jour votre secret NextAuth

Les informations d'identification partagées dans les discussions peuvent être exposées à des risques de sécurité.
