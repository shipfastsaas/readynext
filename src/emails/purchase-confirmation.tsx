import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
  Button,
  Link,
  Img,
  Row,
  Column,
} from '@react-email/components';

interface PurchaseConfirmationEmailProps {
  customerName?: string;
  productName?: string;
  githubLink?: string;
  amount?: string;
}

export const PurchaseConfirmationEmail = ({
  customerName = 'Valued Customer',
  productName = 'ShipFast Starter Kit',
  githubLink = 'https://github.com/shipfaststarter/template',
  amount = '$199',
}: PurchaseConfirmationEmailProps) => {
  const previewText = `Merci pour votre achat de ${productName}`;
  const logoUrl = 'https://www.shipfastsaas.com/_next/image?url=%2Flogo.png&w=384&q=75';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shipfaststarter.com';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        {/* Background gradient elements */}
        <Container style={container}>
          {/* Header with logo */}
          <Section style={logoContainer}>
            <Img
              src={logoUrl}
              width="150"
              height="40"
              alt="ShipFastStarter Logo"
              style={logo}
            />
          </Section>
          
          {/* Badge section */}
          <Section style={badgeSection}>
            <div style={badgeContainer}>
              <span style={badge}>Next.js 14 Universal Starter Kit</span>
              <span style={statusBadge}>
                <span style={statusDot}></span>
                Livré avec succès
              </span>
            </div>
          </Section>
          
          {/* Main heading */}
          <Heading style={h1}>
            <span style={gradientText}>Merci pour votre achat!</span>
            <br />
            <span style={secondaryHeading}>ShipFastStarter Template</span>
          </Heading>
          
          {/* Main content */}
          <Section style={mainContent}>
            <Text style={text}>Bonjour {customerName},</Text>
            
            <Text style={text}>
              Votre paiement de <strong>{amount}</strong> pour le <strong>{productName}</strong> a été confirmé avec succès. Nous sommes ravis de vous compter parmi nos clients!
            </Text>
            
            <Text style={text}>
              Vous pouvez maintenant accéder au code source complet sur GitHub et commencer à construire votre projet dès aujourd'hui.
            </Text>
            
            {/* CTA Button */}
            <Section style={buttonContainer}>
              <Button style={primaryButton} href={githubLink}>
                Accéder au Template sur GitHub
              </Button>
            </Section>
            
            {/* Features section */}
            <Section style={featuresSection}>
              <Row>
                <Column style={featureColumn}>
                  <Img src={`${appUrl}/icons/authentication.svg`} width="32" height="32" alt="Authentication" style={featureIcon} />
                  <Text style={featureTitle}>Authentication</Text>
                  <Text style={featureDescription}>Système d'authentification complet avec NextAuth.js</Text>
                </Column>
                
                <Column style={featureColumn}>
                  <Img src={`${appUrl}/icons/database.svg`} width="32" height="32" alt="Database" style={featureIcon} />
                  <Text style={featureTitle}>Database</Text>
                  <Text style={featureDescription}>Configuration Prisma avec migrations et schémas</Text>
                </Column>
              </Row>
              
              <Row>
                <Column style={featureColumn}>
                  <Img src={`${appUrl}/icons/payments.svg`} width="32" height="32" alt="Payments" style={featureIcon} />
                  <Text style={featureTitle}>Payments</Text>
                  <Text style={featureDescription}>Intégration Stripe pour les paiements en ligne</Text>
                </Column>
                
                <Column style={featureColumn}>
                  <Img src={`${appUrl}/icons/ui.svg`} width="32" height="32" alt="UI" style={featureIcon} />
                  <Text style={featureTitle}>UI Components</Text>
                  <Text style={featureDescription}>Composants UI modernes et réutilisables</Text>
                </Column>
              </Row>
            </Section>
            
            <Text style={text}>
              Si vous avez des questions concernant l'installation ou l'utilisation du template, n'hésitez pas à consulter notre documentation ou à nous contacter directement.
            </Text>
            
            <Text style={signatureText}>
              Bonne création!<br />
              L'équipe ShipFastStarter
            </Text>
          </Section>
          
          <Hr style={hr} />
          
          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footer}>
              &copy; {new Date().getFullYear()} ShipFastStarter. Tous droits réservés.
            </Text>
            <Text style={footer}>
              <Link href="https://shipfaststarter.com" style={link}>shipfaststarter.com</Link> | 
              <Link href="https://twitter.com/shipfaststarter" style={link}> Twitter</Link> | 
              <Link href="https://github.com/shipfaststarter" style={link}> GitHub</Link>
            </Text>
            <Text style={footerTagline}>
              The Best Next.js Boilerplate & SaaS Starter Kit Template
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PurchaseConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#f8fafc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  backgroundImage: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 0',
  maxWidth: '600px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03)',
  position: 'relative' as const,
  overflow: 'hidden' as const,
};

const logoContainer = {
  marginTop: '10px',
  marginBottom: '20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const badgeSection = {
  textAlign: 'center' as const,
  marginBottom: '20px',
};

const badgeContainer = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  gap: '10px',
};

const badge = {
  padding: '6px 12px',
  fontSize: '14px',
  color: '#8b5cf6', // primary-purple
  backgroundColor: 'rgba(139, 92, 246, 0.1)', // primary-purple/10
  borderRadius: '9999px',
  display: 'inline-block',
};

const statusBadge = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  fontSize: '14px',
  color: '#64748b', // text-secondary
};

const statusDot = {
  width: '8px',
  height: '8px',
  marginRight: '8px',
  borderRadius: '9999px',
  backgroundColor: '#22c55e', // green-500
  display: 'inline-block',
};

const h1 = {
  textAlign: 'center' as const,
  margin: '30px 0 40px',
  padding: '0 20px',
  fontSize: '36px',
  fontWeight: '800',
  lineHeight: '1.1',
};

const gradientText = {
  background: 'linear-gradient(to right, #ec4899, #8b5cf6)', // from-primary-rose to-primary-purple
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  display: 'inline-block',
};

const secondaryHeading = {
  color: '#1e293b', // text-primary
  display: 'inline-block',
};

const mainContent = {
  padding: '0 40px',
};

const text = {
  color: '#334155', // text-secondary darker
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const primaryButton = {
  backgroundColor: '#8b5cf6', // primary-purple
  backgroundImage: 'linear-gradient(to right, #ec4899, #8b5cf6)', // from-primary-rose to-primary-purple
  borderRadius: '9999px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  boxShadow: '0 4px 6px rgba(139, 92, 246, 0.25)',
};

const featuresSection = {
  margin: '40px 0',
  padding: '20px',
  backgroundColor: '#f8fafc',
  borderRadius: '8px',
};

const featureColumn = {
  padding: '10px',
  textAlign: 'center' as const,
};

const featureIcon = {
  margin: '0 auto 10px',
};

const featureTitle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#1e293b',
  margin: '8px 0',
};

const featureDescription = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
};

const signatureText = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '32px 0 16px',
  fontStyle: 'italic',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '32px 0 24px',
};

const footerSection = {
  padding: '0 40px',
};

const footer = {
  color: '#94a3b8',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const footerTagline = {
  color: '#94a3b8',
  fontSize: '12px',
  margin: '16px 0 0',
  textAlign: 'center' as const,
  fontStyle: 'italic',
};

const link = {
  color: '#8b5cf6',
  textDecoration: 'none',
};
