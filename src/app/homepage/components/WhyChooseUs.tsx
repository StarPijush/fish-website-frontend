import Icon from '@/components/ui/AppIcon';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 'feature_daily',
    icon: 'ClockIcon',
    title: 'Daily Fresh Deliveries',
    description: 'All seafood caught and delivered within 24 hours. No frozen products, only fresh.',
  },
  {
    id: 'feature_sustainable',
    icon: 'CheckBadgeIcon',
    title: 'Sustainably Sourced',
    description: 'We partner with certified fisheries committed to ocean conservation and ethical practices.',
  },
  {
    id: 'feature_quality',
    icon: 'ShieldCheckIcon',
    title: 'Quality Guaranteed',
    description: '100% satisfaction guarantee. Not happy? Full refund or replacement, no questions asked.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-card relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
            Fresh. Sustainable. Guaranteed.
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed">
            We're committed to delivering the highest quality seafood while protecting our oceans for future generations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="group hover:scale-105 transition-transform duration-300"
            >
              <div className="glass-card rounded-3xl p-8 h-full">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 ease-out">
                  <Icon
                    name={feature.icon as any}
                    variant="solid"
                    size={32}
                    className="text-white group-hover:scale-125 group-hover:animate-pulse transition-all duration-300"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Number Badge */}
                <div className="mt-6 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}