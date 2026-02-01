"use client";

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CartSummaryBarProps {
  totalItems: number;
  totalPrice: number;
}

export default function CartSummaryBar({ totalItems, totalPrice }: CartSummaryBarProps) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-border z-40 animate-slide-up">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Cart Info */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icon name="ShoppingCartIcon" size={24} className="text-primary animate-bounce" />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-secondary text-white dark:text-foreground text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/70">Cart Total</p>
              <p className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* View Cart Button */}
          <Link
            href="/cart"
            className="bg-primary hover:bg-primary/90 text-white dark:text-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95 group"
          >
            <span>View Cart</span>
            <Icon name="ArrowRightIcon" size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}