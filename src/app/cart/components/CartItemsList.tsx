"use client";

import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CartItem {
  id: string;
  name: string;
  pricePerKg: number;
  quantity: number;
  image?: string;
  alt?: string;
}

interface CartItemsListProps {
  items: CartItem[];
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void;
}

export default function CartItemsList({ items, updateQuantity, removeItem }: CartItemsListProps) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="glass-card rounded-3xl p-6 hover:shadow-xl transition-all">
          <div className="flex gap-4">
            {/* Image */}
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <AppImage
                src={item.image || '/assets/images/no_image.png'}
                alt={item.alt || item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-foreground/60">${item.pricePerKg.toFixed(2)} per kg</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-error/10 rounded-full transition-colors group"
                  aria-label="Remove item"
                >
                  <Icon name="TrashIcon" size={18} className="text-foreground/40 group-hover:text-error transition-colors" />
                </button>
              </div>

              {/* Quantity & Price */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-border hover:bg-primary/10 dark:hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
                    aria-label="Decrease quantity"
                  >
                    <Icon name="MinusIcon" size={16} className="text-foreground group-hover:scale-110 transition-transform duration-300" />
                  </button>
                  <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-border hover:bg-primary/10 dark:hover:bg-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
                    aria-label="Increase quantity"
                  >
                    <Icon name="PlusIcon" size={16} className="text-foreground group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
                <p className="text-xl font-bold text-primary">
                  ${(item.pricePerKg * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}