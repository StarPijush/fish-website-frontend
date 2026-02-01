"use client";

import { useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface FishItem {
  id: string;
  name: string;
  pricePerKg: number;
  image: string;
  alt: string;
  origin: string;
  sustainable: boolean;
}

const featuredFish: FishItem[] = [
{
  id: 'fish_salmon',
  name: 'Atlantic Salmon',
  pricePerKg: 28.99,
  image: "https://images.unsplash.com/photo-1673767413856-2cfc082c7ea5",
  alt: 'Fresh Atlantic salmon fillet with pink flesh on ice',
  origin: 'Norway',
  sustainable: true
},
{
  id: 'fish_tuna',
  name: 'Yellowfin Tuna',
  pricePerKg: 35.99,
  image: "https://images.unsplash.com/photo-1649730243029-13df7da2b843",
  alt: 'Red tuna steak with deep red color on white background',
  origin: 'Pacific Ocean',
  sustainable: true
},
{
  id: 'fish_seabass',
  name: 'Sea Bass',
  pricePerKg: 24.99,
  image: "https://images.unsplash.com/photo-1712064740743-f5d1cafbff97",
  alt: 'Whole sea bass fish with silver scales on ice',
  origin: 'Mediterranean',
  sustainable: false
},
{
  id: 'fish_shrimp',
  name: 'Tiger Prawns',
  pricePerKg: 32.99,
  image: "https://images.unsplash.com/photo-1568267641487-2c9405330c96",
  alt: 'Fresh tiger prawns with orange stripes on ice',
  origin: 'Thailand',
  sustainable: true
}];


export default function FeaturedCatch() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-2xl">
            <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-3 block">
              Featured Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
              Today's Fresh Catch
            </h2>
            <p className="text-lg text-foreground/70">
              Hand-picked by our team this morning. Limited availability.
            </p>
          </div>

          {/* Scroll Buttons (Desktop) */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Scroll left">

              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
              aria-label="Scroll right">

              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6">

          {featuredFish.map((fish) =>
          <div
            key={fish.id}
            className="min-w-[300px] shrink-0 snap-start group">

              <div className="glass-card rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <AppImage
                  src={fish.image}
                  alt={fish.alt}
                  className="w-full h-full object-cover grayscale-hover group-hover:scale-110 transition-all duration-700" />

                  {fish.sustainable &&
                <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Icon name="CheckBadgeIcon" variant="solid" size={16} className="text-success" />
                      <span className="text-xs font-bold text-success">Sustainable</span>
                    </div>
                }
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground mb-1">
                        {fish.name}
                      </h3>
                      <p className="text-sm text-foreground/60 flex items-center gap-1">
                        <Icon name="MapPinIcon" size={14} />
                        {fish.origin}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${fish.pricePerKg}</p>
                      <p className="text-xs text-foreground/60">per kg</p>
                    </div>
                  </div>

                  <Link
                  href="/products"
                  className="w-full mt-4 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">

                    <span>View Details</span>
                    <Icon name="ArrowRightIcon" size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group">

            <span>View All Products</span>
            <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>);

}