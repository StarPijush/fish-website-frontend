"use client";

import Icon from '@/components/ui/AppIcon';

interface CartItem {
  id: string;
  name: string;
  pricePerKg: number;
  quantity: number;
}

interface WhatsAppCTAProps {
  cartItems: CartItem[];
  total: number;
}

export default function WhatsAppCTA({ cartItems, total }: WhatsAppCTAProps) {
  const generateWhatsAppMessage = () => {
    let message = `🐟 *FreshCatch Order*\n\n`;
    message += `📦 *Items:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} kg @ $${item.pricePerKg.toFixed(2)}/kg = $${(item.quantity * item.pricePerKg).toFixed(2)}\n`;
    });
    
    message += `\n💰 *Total: $${total.toFixed(2)}*\n\n`;
    message += `Please confirm my order and delivery details. Thank you! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    let message = generateWhatsAppMessage();
    const phoneNumber = '1234567890'; // Replace with actual business WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pb-6">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-lg group"
        >
          <Icon name="ChatBubbleLeftRightIcon" size={24} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
          <span>Order via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}