import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ProductsInteractive from './components/ProductsInteractive';

export const metadata: Metadata = {
  title: "Today's Fresh Catch - FreshCatch Products",
  description: 'Browse our daily selection of fresh seafood. Hand-selected fish, sustainably sourced. Order via WhatsApp.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <ProductsInteractive />
      </main>
      <Footer />
    </div>
  );
}