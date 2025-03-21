import Image from 'next/image';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import PricingSection from './components/PricingSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <PricingSection />
    </main>
  );
} 