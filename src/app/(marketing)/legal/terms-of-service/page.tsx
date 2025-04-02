import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ShipFastStarter',
  description: 'Terms and conditions governing the use of the ShipFastStarter Next.js SaaS kit.',
}

export default function TermsOfServicePage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary dark:text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-base text-text-secondary">
          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="mt-12 space-y-8 text-base leading-7 text-text-secondary">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">1. Agreement to Terms</h2>
            <p>
              By accessing or using ShipFastStarter ("we," "our," or "us"), you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">2. Use License</h2>
            <p>
              When you purchase ShipFastStarter, we grant you a non-exclusive, worldwide, perpetual license to use the software for creating and deploying applications. This license is subject to these Terms of Service and the specific license terms included with your purchase.
            </p>
            <p>
              You may:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the software to create unlimited personal and commercial projects</li>
              <li>Modify the source code for your own projects</li>
              <li>Deploy applications built with the software to production environments</li>
            </ul>
            <p>
              You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Redistribute the unmodified source code as a standalone product</li>
              <li>Sell or redistribute the software as part of a competing product</li>
              <li>Remove any copyright or proprietary notices from the software</li>
              <li>Use the software in any way that violates applicable laws or regulations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">3. Services Description</h2>
            <p>
              ShipFastStarter is a Next.js SaaS starter kit designed to help developers build and deploy SaaS applications quickly. The software includes pre-built components, authentication systems, payment integrations, and other features to accelerate development.
            </p>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">4. Technical Support</h2>
            <p>
              Technical support is provided according to the support plan included with your purchase. Standard support includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access to documentation and tutorials</li>
              <li>Community forum support</li>
              <li>Bug fixes and updates as released</li>
            </ul>
            <p>
              Premium support plans may include additional services such as direct email support, priority response times, and implementation assistance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">5. Payment and Refunds</h2>
            <p>
              All purchases are processed securely through our payment processors. Prices are listed in USD unless otherwise specified and do not include any applicable taxes.
            </p>
            <p>
              We offer a 30-day money-back guarantee. If you are not satisfied with your purchase, you may request a refund within 30 days of the initial purchase. Refund requests after this period will not be honored.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">6. User Accounts</h2>
            <p>
              Some features of our services may require you to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <p>
              You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information when creating your account</li>
              <li>Update your information to keep it current</li>
              <li>Safeguard your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">7. Intellectual Property</h2>
            <p>
              ShipFastStarter, including its code, documentation, design, and content, is protected by copyright, trademark, and other intellectual property laws. Our intellectual property may not be used in connection with any product or service without our prior written consent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">8. Limitation of Liability</h2>
            <p>
              In no event shall ShipFastStarter, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">9. Disclaimer</h2>
            <p>
              Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">10. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
            </p>
            <p>
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on our website. Changes to the Terms will be effective when posted.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-text-primary dark:text-white">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="font-medium">
              Email: legal@shipfaststarter.com
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
