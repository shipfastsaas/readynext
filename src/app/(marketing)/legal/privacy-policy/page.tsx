import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | ShipFastStarter',
  description: 'Our commitment to protecting your privacy and data when using the ShipFastStarter Next.js SaaS kit.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-12 space-y-8 text-base leading-7 text-text-secondary">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">1. Introduction</h2>
            <p>
              Welcome to ShipFastStarter ("we," "our," or "us"). We are committed to protecting your privacy and the data you share with us when you use our Next.js SaaS starter kit. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with our platform.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our services, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Personal Information:</strong> Name, email address, billing information, and other contact details you provide when registering for our services or making a purchase.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you use our website and services, including your browsing actions, patterns, and interactions with our platform.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and other technology on the devices you use to access our services.
              </li>
              <li>
                <strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and our third parties and your communication preferences.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">3. How We Use Your Information</h2>
            <p>
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To process transactions and send related information</li>
              <li>To send administrative information, such as updates, security alerts, and support messages</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To personalize your experience and deliver content relevant to your interests</li>
              <li>To monitor and analyze trends, usage, and activities in connection with our services</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">4. Data Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Service Providers:</strong> Third-party vendors who perform services on our behalf (e.g., payment processing, data analysis, email delivery, hosting services).
              </li>
              <li>
                <strong>Business Partners:</strong> We may share your information with our business partners to offer you certain products, services, or promotions.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">6. Your Data Protection Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The right to access, update, or delete your information</li>
              <li>The right to rectification (to correct inaccurate data)</li>
              <li>The right to object to our processing of your personal data</li>
              <li>The right of restriction (to request that we restrict processing)</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our services and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">8. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">9. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="font-medium">
              Email: privacy@shipfaststarter.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
