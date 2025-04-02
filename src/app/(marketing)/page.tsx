import { HeroSection } from '@/components/sections/hero-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { PricingSection } from '@/components/sections/pricing-section'
import { FaqSection } from '@/components/sections/faq-section'
import { DemoSection } from '@/components/sections/demo-section'
import { CtaSection } from '@/components/sections/cta-section'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { UniqueValueSection } from '@/components/sections/unique-value-section'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <NewsletterSection />
    </main>
  )
}