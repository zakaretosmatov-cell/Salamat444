'use client';

import Link from 'next/link';
import { Zap, Twitter, Instagram, Github, Play } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'All Products', href: '/products' },
    { label: 'Electronics', href: '/products?category=electronics' },
    { label: 'Fashion', href: '/products?category=fashion' },
    { label: 'Home & Living', href: '/products?category=home' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Help Center', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Order Tracking', href: '#' },
    { label: 'Contact Us', href: '#' },
  ],
};

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Github, href: '#', label: 'Github' },
  { icon: Play, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24" style={{ borderTop: '1px solid var(--color-border)' }}>
      {/* Gradient top line */}
      <div
        className="h-px w-full"
        style={{ background: 'var(--gradient-primary)', opacity: 0.4 }}
      />

      <div className="glass" style={{ borderTop: 'none' }}>
        <div className="container-max py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Zap size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">Nexus Market</span>
              </Link>
              <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ color: 'var(--color-text-secondary)' }}>
                The world&#39;s most premium marketplace, connecting buyers and sellers with exceptional products across every category.
              </p>

              {/* Newsletter */}
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-glass flex-1 text-sm"
                />
                <button className="btn-primary text-sm py-2.5">Subscribe</button>
              </div>

              {/* Socials */}
              <div className="flex gap-3 mt-6">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="btn-icon"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-semibold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200 hover:opacity-100"
                        style={{ color: 'var(--color-text-secondary)' }}
                        onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-text-primary)'}
                        onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--color-text-secondary)'}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <hr className="divider my-10" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              © 2026 Nexus Market, Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs transition-colors duration-200"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = 'var(--color-text-secondary)'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'var(--color-text-muted)'}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
