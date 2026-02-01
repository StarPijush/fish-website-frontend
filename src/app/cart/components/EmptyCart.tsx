import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Empty Cart Icon */}
      <div className="w-32 h-32 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 animate-bounce">
        <Icon name="ShoppingCartIcon" size={64} className="text-primary/50 animate-pulse" />
      </div>

      {/* Content */}
      <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
        Your Cart is Empty
      </h1>
      <p className="text-lg text-foreground/70 mb-10 max-w-md mx-auto">
        Looks like you haven't added any fresh seafood yet. Browse our daily selection!
      </p>

      {/* CTA */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white dark:text-foreground px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        <Icon name="ArrowLeftIcon" size={18} className="group-hover:-translate-x-2 transition-transform duration-300" />
        <span>Browse Products</span>
      </Link>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        <div className="glass-card rounded-2xl p-6">
          <Icon name="ClockIcon" size={32} className="text-primary mx-auto mb-3" />
          <p className="text-sm font-bold text-foreground mb-1">Daily Fresh</p>
          <p className="text-xs text-foreground/60">Caught today</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <Icon name="TruckIcon" size={32} className="text-primary mx-auto mb-3" />
          <p className="text-sm font-bold text-foreground mb-1">Same Day</p>
          <p className="text-xs text-foreground/60">2-4 hours delivery</p>
        </div>
        <div className="glass-card rounded-2xl p-6">
          <Icon name="CheckBadgeIcon" variant="solid" size={32} className="text-success mx-auto mb-3" />
          <p className="text-sm font-bold text-foreground mb-1">Guaranteed</p>
          <p className="text-xs text-foreground/60">100% satisfaction</p>
        </div>
      </div>
    </div>
  );
}