import Icon from '@/components/ui/AppIcon';

interface Step {
  id: string;
  number: number;
  icon: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    id: 'step_browse',
    number: 1,
    icon: 'MagnifyingGlassIcon',
    title: 'Browse',
    description: 'Explore our daily selection of fresh seafood',
  },
  {
    id: 'step_add',
    number: 2,
    icon: 'ShoppingCartIcon',
    title: 'Add to Cart',
    description: 'Select your fish and quantities',
  },
  {
    id: 'step_whatsapp',
    number: 3,
    icon: 'ChatBubbleLeftRightIcon',
    title: 'WhatsApp Us',
    description: 'Send your order via WhatsApp',
  },
  {
    id: 'step_receive',
    number: 4,
    icon: 'TruckIcon',
    title: 'Receive Today',
    description: 'Get fresh seafood delivered to your door',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-float delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-3 block">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
            How It Works
          </h2>
          <p className="text-lg text-foreground/70">
            From ocean to your table in 4 easy steps
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connection Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-secondary" />

            {steps.map((step) => (
              <div key={step.id} className="relative">
                {/* Step Card */}
                <div className="glass-card rounded-3xl p-6 text-center hover:shadow-xl transition-all duration-300 group">
                  {/* Number Badge */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="absolute w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 group-hover:scale-125 group-hover:animate-pulse transition-all duration-500" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:rotate-12 transition-all duration-500">
                      <Icon
                        name={step.icon as any}
                        variant="solid"
                        size={28}
                        className="text-white group-hover:scale-110 group-hover:animate-bounce transition-all duration-300"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-125 transition-transform duration-300">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-heading font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Desktop) */}
                {step.number < 4 && (
                  <div className="hidden md:block absolute top-12 -right-4 z-20">
                    <Icon name="ChevronRightIcon" size={24} className="text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}