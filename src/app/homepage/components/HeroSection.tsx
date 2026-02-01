"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/10 to-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bubble bubble-1" />
        <div className="bubble bubble-2" />
        <div className="bubble bubble-3" />
        <div className="light-ray light-ray-1" />
        <div className="light-ray light-ray-2" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 dark:bg-secondary/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-float">
            <Icon name="SparklesIcon" variant="solid" size={16} className="text-secondary animate-pulse" />
            <span className="text-sm font-semibold text-secondary">Fresh Daily Catch</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-tight mb-6 animate-fade-up delay-200">
            Ocean-Fresh Seafood,
            <br />
            <span className="text-accent">Delivered to Your Door</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-300">
            Hand-selected daily. Sustainably sourced. Order via WhatsApp and receive the finest seafood within hours.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up delay-500">
            <Link
              href="/products"
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-all hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <span>Browse Today's Catch</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={20} />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Floating Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-16 animate-fade-up delay-700">
            <div className="glass-card rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                  <Icon name="CheckCircleIcon" variant="solid" size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60 font-medium">Freshness</p>
                  <p className="text-xl font-bold text-foreground">Caught Today</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <Icon name="TruckIcon" size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60 font-medium">Delivery</p>
                  <p className="text-xl font-bold text-foreground">Same Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Scroll Indicator */}
      {isVisible && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
          <Icon name="ChevronDownIcon" size={32} className="text-white/70" />
        </div>
      )}
    </section>
  );
}