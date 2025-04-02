import { Resend } from 'resend';

// Initialiser Resend avec la clé API
export const resend = new Resend(process.env.RESEND_API_KEY);

// Adresse email d'expéditeur - utiliser l'adresse du domaine vérifié
export const SENDER_EMAIL = 'purchases@shipfastsaas.com';
