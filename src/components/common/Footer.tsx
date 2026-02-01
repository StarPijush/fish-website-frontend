import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  const currentYear = 2026;

  const footerLinks = [
    { id: 'footer_about', label: 'About', href: '/homepage#about' },
    { id: 'footer_contact', label: 'Contact', href: '/homepage#contact' },
    { id: 'footer_terms', label: 'Terms', href: '#' },
    { id: 'footer_privacy', label: 'Privacy', href: '#' },
  ];

  const socialLinks = [
    { id: 'social_instagram', icon: 'CameraIcon', href: 'https://instagram.com', label: 'Instagram' },
    { id: 'social_whatsapp', icon: 'ChatBubbleLeftRightIcon', href: 'https://wa.me/1234567890', label: 'WhatsApp' },
    { id: 'social_facebook', icon: 'UserGroupIcon', href: 'https://facebook.com', label: 'Facebook' },
  ];

  return (
    <footer className="bg-primary dark:bg-card text-white dark:text-foreground py-12 mt-20 border-t dark:border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/homepage" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-primary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Icon name="SparklesIcon" variant="solid" size={16} className="text-primary dark:text-white group-hover:animate-pulse" />
              </div>
              <span className="text-lg font-heading font-bold">FreshCatch</span>
            </Link>
            <p className="text-sm text-white/70 dark:text-muted-foreground">© {currentYear} FreshCatch. All rights reserved.</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-sm font-medium text-white/80 dark:text-muted-foreground hover:text-white dark:hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 dark:border-border flex items-center justify-center hover:bg-white hover:text-primary dark:hover:bg-primary dark:hover:text-white hover:scale-110 hover:rotate-12 transition-all duration-300 group"
                aria-label={social.label}
              >
                <Icon name={social.icon as any} size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}