import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CartInteractive from './components/CartInteractive';

export const metadata: Metadata = {
  title: 'Your Cart - FreshCatch',
  description: 'Review your order and place it via WhatsApp. Fresh seafood delivered to your door.',
};

export default function CartPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20 pb-32">
        <CartInteractive />
      </main>
      <Footer />
    </div>
  );
}