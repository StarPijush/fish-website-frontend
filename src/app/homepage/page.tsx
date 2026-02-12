import type { Metadata } from 'next'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

import HeroSection from './components/HeroSection'
import FeaturedCatch from './components/FeaturedCatch'
import WhyChooseUs from './components/WhyChooseUs'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'

export const metadata: Metadata = {
  title: 'FreshCatch - Ocean-Fresh Seafood Delivered',
  description:
    'Hand-selected daily seafood, sustainably sourced. Order fresh fish via WhatsApp and get it delivered to your door.',
}

export default function Homepage() {
  return (
    <div className="min-h-screen">

      {/* Global Header */}
      <Header />

      {/* Push content below fixed header */}
      <main className="pt-20">
        <HeroSection />
        <FeaturedCatch />
        <WhyChooseUs />
        <HowItWorks />
        <CTASection />
      </main>

      {/* Global Footer */}
      <Footer />

    </div>
  )
}
