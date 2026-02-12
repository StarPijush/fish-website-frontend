"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import type { Fish } from "./ProductsInteractive";
import Icon from "@/components/ui/AppIcon";

interface ProductCarouselProps {
  fish: Fish[];
  cart: { [key: string]: number };
  updateQuantity: (fishId: string, quantity: number) => void;
}

export default function ProductCarousel({
  fish,
  cart,
  updateQuantity,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // 🔥 Reset index if products change
  useEffect(() => {
    if (fish.length > 0 && currentIndex >= fish.length) {
      setCurrentIndex(0);
    }
  }, [fish, currentIndex]);

  // 🔥 Safety guard
  if (!fish || fish.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        No products available yet.
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % fish.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + fish.length) % fish.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) goToNext();
    if (touchStart - touchEnd < -75) goToPrev();
  };

  const getVisibleIndices = () => {
    if (fish.length === 1) {
      return { prevIndex: 0, nextIndex: 0 };
    }

    const prevIndex = (currentIndex - 1 + fish.length) % fish.length;
    const nextIndex = (currentIndex + 1) % fish.length;

    return { prevIndex, nextIndex };
  };

  const { prevIndex, nextIndex } = getVisibleIndices();

  return (
    <section className="py-12 bg-gradient-to-b from-background to-card relative overflow-hidden min-h-screen">
      {/* Ocean Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute w-64 h-64 bg-accent/20 rounded-full blur-3xl top-20 left-10 animate-float" />
        <div className="absolute w-80 h-80 bg-primary/20 rounded-full blur-3xl bottom-20 right-10 animate-float delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-black text-foreground mb-4">
            Today's Fresh Catch 🐟
          </h1>
          <p className="text-lg text-foreground/70 mb-2">
            Swipe to choose your fish
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground/60">
            <Icon name="ArrowLeftIcon" size={16} />
            <span>Swipe</span>
            <Icon name="ArrowRightIcon" size={16} />
          </div>
        </div>

        {/* Scroll Buttons */}
        {fish.length > 1 && (
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Previous product"
            >
              <Icon name="ChevronLeftIcon" size={20} />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Next product"
            >
              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        )}

        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-center min-h-[500px] py-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Left */}
          {fish.length > 1 && (
            <div className="absolute left-0 md:left-[10%] transform -translate-x-1/2 md:translate-x-0 opacity-30 scale-75 md:scale-90 pointer-events-none transition-all duration-500 z-0">
              <ProductCard
                fish={fish[prevIndex]}
                quantity={cart[fish[prevIndex]?.id] || 0}
                updateQuantity={updateQuantity}
              />
            </div>
          )}

          {/* Center */}
          <div className="relative z-10 transition-all duration-500 transform hover:scale-105">
            <ProductCard
              fish={fish[currentIndex]}
              quantity={cart[fish[currentIndex]?.id] || 0}
              updateQuantity={updateQuantity}
            />
          </div>

          {/* Right */}
          {fish.length > 1 && (
            <div className="absolute right-0 md:right-[10%] transform translate-x-1/2 md:translate-x-0 opacity-30 scale-75 md:scale-90 pointer-events-none transition-all duration-500 z-0">
              <ProductCard
                fish={fish[nextIndex]}
                quantity={cart[fish[nextIndex]?.id] || 0}
                updateQuantity={updateQuantity}
              />
            </div>
          )}
        </div>

        {/* Pagination */}
        {fish.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {fish.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Mobile Hint */}
        {fish.length > 1 && (
          <div className="text-center mt-8 text-sm text-foreground/60">
            <p>← Swipe to see more fish →</p>
          </div>
        )}
      </div>
    </section>
  );
}
