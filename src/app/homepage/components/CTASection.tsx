import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-bounce">
            <Icon name="SparklesIcon" variant="solid" size={32} className="text-white animate-pulse" />
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
            Ready to Order Fresh Fish?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse our daily selection and place your order via WhatsApp. Delivery within hours.
          </p>

          {/* CTA Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl group"
          >
            <span>Start Shopping</span>
            <Icon name="ArrowRightIcon" size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
          </Link>

          {/* Trust Badge */}
          <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircleIcon" variant="solid" size={20} />
              <span>Same Day Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={20} />
              <span>Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}