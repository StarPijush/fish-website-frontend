import Icon from '@/components/ui/AppIcon';

interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export default function OrderSummary({ subtotal, deliveryFee, total }: OrderSummaryProps) {
  return (
    <div className="glass-card rounded-3xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name="ReceiptPercentIcon" size={20} className="text-primary" />
        </div>
        <h3 className="text-xl font-heading font-bold text-foreground">Order Summary</h3>
      </div>

      {/* Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="ShoppingBagIcon" size={18} className="text-foreground/60 hover:scale-110 transition-transform duration-300" />
            <span className="text-foreground/70">Subtotal</span>
          </div>
          <span className="font-semibold text-foreground">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Icon name="TruckIcon" size={18} className="text-foreground/60 hover:scale-110 transition-transform duration-300" />
            <span className="text-foreground/70">Delivery</span>
          </div>
          <span className="font-semibold text-foreground">₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div className="h-px bg-border" />
        <div className="flex items-center justify-between py-3 border-b border-border">
          <span className="text-lg font-bold text-foreground">Total</span>
          <span className="text-2xl font-black text-primary">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Estimated Delivery */}
      <div className="glass rounded-2xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center shrink-0">
          <Icon name="ClockIcon" size={20} className="text-success" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">Estimated Delivery</p>
          <p className="text-xs text-foreground/60">Same day delivery (2-4 hours)</p>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="CheckCircleIcon" variant="solid" size={16} className="text-success" />
          <span className="text-xs text-foreground/70">Fresh Guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="ShieldCheckIcon" size={16} className="text-primary" />
          <span className="text-xs text-foreground/70">Secure Payment</span>
        </div>
      </div>
    </div>
  );
}