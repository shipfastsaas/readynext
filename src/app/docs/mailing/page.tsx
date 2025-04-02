export default function MailingPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Email & Notifications</h1>
      
      <p>
        NextReady includes a robust email and notification system to keep your users informed 
        and engaged. This guide explains how to configure and customize the email functionality 
        in your application.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>Transactional email support</li>
          <li>Email templates with React components</li>
          <li>Internationalized email content</li>
          <li>SMTP configuration</li>
          <li>Email verification flow</li>
          <li>Password reset emails</li>
          <li>Marketing emails and newsletters</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="configuration">Email Configuration</h2>
        
        <p>
          NextReady uses Nodemailer for sending emails. Configure your email settings in your environment variables:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# .env.local
EMAIL_SERVER_HOST=smtp.example.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@example.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=noreply@yourapp.com`}
          </code>
        </pre>

        <h3>Email Service Setup</h3>
        <p>
          NextReady includes a utility for sending emails:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/email.ts
import nodemailer from 'nodemailer'

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  const { EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM } = process.env

  // Create transport
  const transport = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: Number(EMAIL_SERVER_PORT),
    secure: Number(EMAIL_SERVER_PORT) === 465,
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  })

  try {
    const result = await transport.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    })
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="templates">Email Templates</h2>
        
        <p>
          NextReady uses React components to create email templates:
        </p>

        <h3>Email Layout Component</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/emails/email-layout.tsx
import { ReactNode } from 'react'
import { Html, Head, Body, Container, Section, Text, Link, Img } from '@react-email/components'

interface EmailLayoutProps {
  previewText: string
  children: ReactNode
}

export function EmailLayout({ previewText, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Body style={{
        backgroundColor: '#f6f9fc',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <Container style={{
          backgroundColor: '#ffffff',
          margin: '40px auto',
          padding: '20px',
          borderRadius: '5px',
          maxWidth: '600px',
        }}>
          <Section style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Img
              src="https://yourapp.com/logo.png"
              width="120"
              height="40"
              alt="Your App"
            />
          </Section>
          
          {children}
          
          <Section style={{ 
            textAlign: 'center', 
            marginTop: '30px', 
            borderTop: '1px solid #e6ebf1',
            paddingTop: '20px',
            color: '#8898aa',
            fontSize: '12px',
          }}>
            <Text>
              © {new Date().getFullYear()} Your App. All rights reserved.
            </Text>
            <Text>
              <Link href="https://yourapp.com/privacy">Privacy Policy</Link> • 
              <Link href="https://yourapp.com/terms">Terms of Service</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}`}
          </code>
        </pre>

        <h3>Welcome Email Template</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/emails/welcome-email.tsx
import { Section, Heading, Text, Button } from '@react-email/components'
import { EmailLayout } from './email-layout'

interface WelcomeEmailProps {
  name: string
  verificationUrl?: string
}

export function WelcomeEmail({ name, verificationUrl }: WelcomeEmailProps) {
  return (
    <EmailLayout previewText="Welcome to Your App!">
      <Section>
        <Heading as="h1">Welcome to Your App!</Heading>
        <Text>Hi {name},</Text>
        <Text>
          Thank you for signing up for Your App. We're excited to have you on board!
        </Text>
        
        {verificationUrl && (
          <>
            <Text>
              To get started, please verify your email address by clicking the button below:
            </Text>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: '#0070f3',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              Verify Email
            </Button>
          </>
        )}
        
        <Text>
          If you have any questions, feel free to reply to this email. We're here to help!
        </Text>
        <Text>Best regards,</Text>
        <Text>The Your App Team</Text>
      </Section>
    </EmailLayout>
  )
}`}
          </code>
        </pre>

        <h3>Rendering Email Templates to HTML</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/email-renderer.ts
import { renderAsync } from '@react-email/render'
import { WelcomeEmail } from '@/components/emails/welcome-email'
import { PasswordResetEmail } from '@/components/emails/password-reset-email'
import { InvitationEmail } from '@/components/emails/invitation-email'

export async function renderWelcomeEmail(props: {
  name: string
  verificationUrl?: string
}) {
  const html = await renderAsync(WelcomeEmail(props))
  return html
}

export async function renderPasswordResetEmail(props: {
  name: string
  resetUrl: string
}) {
  const html = await renderAsync(PasswordResetEmail(props))
  return html
}

export async function renderInvitationEmail(props: {
  inviterName: string
  organizationName: string
  invitationUrl: string
}) {
  const html = await renderAsync(InvitationEmail(props))
  return html
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="sending">Sending Emails</h2>
        
        <p>
          Use the email utility to send emails from your application:
        </p>

        <h3>Welcome Email Example</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { renderWelcomeEmail } from '@/lib/email-renderer'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    
    // Create user in database
    // ...
    
    // Generate verification token and URL
    const verificationUrl = \`https://yourapp.com/verify?token=\${verificationToken}\`
    
    // Render welcome email
    const html = await renderWelcomeEmail({
      name,
      verificationUrl,
    })
    
    // Send welcome email
    await sendEmail({
      to: email,
      subject: 'Welcome to Your App!',
      html,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    )
  }
}`}
          </code>
        </pre>

        <h3>Password Reset Email</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { renderPasswordResetEmail } from '@/lib/email-renderer'
import { generateResetToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Find user in database
    // ...
    
    // Generate reset token and URL
    const resetToken = await generateResetToken(user.id)
    const resetUrl = \`https://yourapp.com/reset-password?token=\${resetToken}\`
    
    // Render password reset email
    const html = await renderPasswordResetEmail({
      name: user.name,
      resetUrl,
    })
    
    // Send password reset email
    await sendEmail({
      to: email,
      subject: 'Reset Your Password',
      html,
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { error: 'Failed to send password reset email' },
      { status: 500 }
    )
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="i18n">Internationalized Emails</h2>
        
        <p>
          NextReady supports sending emails in multiple languages:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/emails/welcome-email-i18n.tsx
import { Section, Heading, Text, Button } from '@react-email/components'
import { EmailLayout } from './email-layout'

interface WelcomeEmailI18nProps {
  name: string
  verificationUrl?: string
  locale: string
}

export function WelcomeEmailI18n({ name, verificationUrl, locale }: WelcomeEmailI18nProps) {
  // Load translations based on locale
  const translations = getEmailTranslations(locale)
  
  return (
    <EmailLayout previewText={translations.welcomePreview}>
      <Section>
        <Heading as="h1">{translations.welcomeHeading}</Heading>
        <Text>{translations.greeting.replace('{name}', name)}</Text>
        <Text>{translations.welcomeMessage}</Text>
        
        {verificationUrl && (
          <>
            <Text>{translations.verificationMessage}</Text>
            <Button
              href={verificationUrl}
              style={{
                backgroundColor: '#0070f3',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '5px',
                textDecoration: 'none',
                display: 'inline-block',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              {translations.verifyButton}
            </Button>
          </>
        )}
        
        <Text>{translations.supportMessage}</Text>
        <Text>{translations.regards}</Text>
        <Text>{translations.team}</Text>
      </Section>
    </EmailLayout>
  )
}

function getEmailTranslations(locale: string) {
  const translations = {
    en: {
      welcomePreview: 'Welcome to Your App!',
      welcomeHeading: 'Welcome to Your App!',
      greeting: 'Hi {name},',
      welcomeMessage: 'Thank you for signing up for Your App. We're excited to have you on board!',
      verificationMessage: 'To get started, please verify your email address by clicking the button below:',
      verifyButton: 'Verify Email',
      supportMessage: 'If you have any questions, feel free to reply to this email. We're here to help!',
      regards: 'Best regards,',
      team: 'The Your App Team',
    },
    fr: {
      welcomePreview: 'Bienvenue sur Votre App !',
      welcomeHeading: 'Bienvenue sur Votre App !',
      greeting: 'Bonjour {name},',
      welcomeMessage: 'Merci de vous être inscrit à Votre App. Nous sommes ravis de vous avoir à bord !',
      verificationMessage: 'Pour commencer, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :',
      verifyButton: 'Vérifier l\'email',
      supportMessage: 'Si vous avez des questions, n\'hésitez pas à répondre à cet e-mail. Nous sommes là pour vous aider !',
      regards: 'Cordialement,',
      team: 'L\'équipe de Votre App',
    },
    // Add other languages as needed
  }
  
  return translations[locale] || translations.en
}`}
          </code>
        </pre>

        <h3>Sending Internationalized Emails</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/email-renderer.ts
import { renderAsync } from '@react-email/render'
import { WelcomeEmailI18n } from '@/components/emails/welcome-email-i18n'

export async function renderWelcomeEmailI18n(props: {
  name: string
  verificationUrl?: string
  locale: string
}) {
  const html = await renderAsync(WelcomeEmailI18n(props))
  return html
}

// Usage in API route
// Get user's preferred locale
const locale = user.locale || 'en'

// Render email with locale
const html = await renderWelcomeEmailI18n({
  name: user.name,
  verificationUrl,
  locale,
})`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="testing">Testing Emails</h2>
        
        <p>
          NextReady includes utilities for testing emails:
        </p>

        <h3>Email Preview Route</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/email-preview/route.ts
import { NextResponse } from 'next/server'
import { renderWelcomeEmail, renderPasswordResetEmail } from '@/lib/email-renderer'

export async function GET(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Email preview only available in development' },
      { status: 403 }
    )
  }
  
  const { searchParams } = new URL(request.url)
  const template = searchParams.get('template')
  
  try {
    let html = ''
    
    if (template === 'welcome') {
      html = await renderWelcomeEmail({
        name: 'John Doe',
        verificationUrl: 'https://example.com/verify?token=example',
      })
    } else if (template === 'reset') {
      html = await renderPasswordResetEmail({
        name: 'John Doe',
        resetUrl: 'https://example.com/reset?token=example',
      })
    } else {
      return NextResponse.json(
        { error: 'Invalid template' },
        { status: 400 }
      )
    }
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    console.error('Email preview error:', error)
    return NextResponse.json(
      { error: 'Failed to render email template' },
      { status: 500 }
    )
  }
}`}
          </code>
        </pre>

        <p>
          Access email previews at:
        </p>
        <ul>
          <li><code>/api/email-preview?template=welcome</code></li>
          <li><code>/api/email-preview?template=reset</code></li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="providers">Email Service Providers</h2>
        
        <p>
          NextReady works with various email service providers:
        </p>

        <h3>SendGrid Integration</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/email-sendgrid.ts
import sgMail from '@sendgrid/mail'

export async function sendEmailSendGrid({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  // Set API key
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  
  try {
    const result = await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    })
    
    return { success: true, messageId: result[0].messageId }
  } catch (error) {
    console.error('Error sending email with SendGrid:', error)
    return { success: false, error }
  }
}`}
          </code>
        </pre>

        <h3>Mailchimp Integration</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/email-mailchimp.ts
import mailchimp from '@mailchimp/mailchimp_transactional'

export async function sendEmailMailchimp({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  // Initialize client
  const client = mailchimp(process.env.MAILCHIMP_API_KEY)
  
  try {
    const result = await client.messages.send({
      message: {
        from_email: process.env.EMAIL_FROM,
        subject,
        html,
        to: [{ email: to }],
      },
    })
    
    return { success: true, messageId: result[0].id }
  } catch (error) {
    console.error('Error sending email with Mailchimp:', error)
    return { success: false, error }
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Email Best Practices</h2>
        
        <ul>
          <li>
            <strong>Responsive Design:</strong> Ensure emails look good on all devices.
          </li>
          <li>
            <strong>Plain Text Alternative:</strong> Always provide a plain text version of your emails.
          </li>
          <li>
            <strong>Spam Compliance:</strong> Include unsubscribe links and physical address in marketing emails.
          </li>
          <li>
            <strong>Email Authentication:</strong> Set up SPF, DKIM, and DMARC records for your domain.
          </li>
          <li>
            <strong>Testing:</strong> Test emails across different email clients before sending.
          </li>
          <li>
            <strong>Rate Limiting:</strong> Implement rate limiting to prevent abuse of email endpoints.
          </li>
          <li>
            <strong>Logging:</strong> Log email sending attempts and delivery status for troubleshooting.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After setting up your email system, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/authentication" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Integrate email verification with authentication
            </a>
          </li>
          <li>
            <a href="/docs/organizations" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Set up organization invitations via email
            </a>
          </li>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your application with email functionality
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
