"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/contexts/ThemeContext';

interface CartState {
  itemCount: number;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Update cart count from localStorage
    const updateCartCount = () => {
      const cart = localStorage.getItem('freshcatch_cart');
      if (cart) {
        const cartData = JSON.parse(cart);
        const count = cartData.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cart-updated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cart-updated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'nav_home', label: 'Home', href: '/homepage' },
    { id: 'nav_products', label: 'Products', href: '/products' },
    { id: 'nav_cart', label: 'Cart', href: '/cart' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-card shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Icon name="SparklesIcon" variant="solid" size={20} className="text-white dark:text-foreground" />
          </div>
          <span className="text-xl font-heading font-bold text-primary group-hover:text-accent transition-colors">
            FreshCatch
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                pathname === link.href
                  ? 'text-primary' :'text-foreground/70 hover:text-primary'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Icon
                  name="MoonIcon"
                  size={20}
                  className="text-foreground group-hover:text-primary group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"
                />
              ) : (
                <Icon
                  name="SunIcon"
                  size={20}
                  className="text-foreground group-hover:text-primary group-hover:rotate-180 group-hover:scale-110 transition-all duration-500"
                />
              )}
            </button>
          )}

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative p-2 rounded-full hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 group"
          >
            <Icon
              name="ShoppingCartIcon"
              size={24}
              className="text-foreground group-hover:text-primary group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white dark:text-foreground text-xs font-bold rounded-full flex items-center justify-center animate-float">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <div
                className={`h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <div
                className={`h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <div
                className={`h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-t border-border">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  pathname === link.href
                    ? 'text-primary' :'text-foreground/70 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}