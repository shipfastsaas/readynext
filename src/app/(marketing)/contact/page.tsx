import { Metadata } from 'next'
import { ContactSection } from '@/components/sections/contact-section'

export const metadata: Metadata = {
  title: 'Contact Us - ShipFast',
  description: 'Get in touch with us. We\'d love to hear from you and help with any questions you may have.',
}

export default function ContactPage() {
  return (
    <main>
      <ContactSection />
    </main>
  )
}
