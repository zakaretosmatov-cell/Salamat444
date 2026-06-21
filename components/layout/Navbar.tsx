'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Zap, Heart } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import CartDrawer from '@/components/cart/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/products?category=electronics', label: 'Electronics' },
  { href: '/products?category=fashion', label: 'Fashion' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none' }}
      >
        <div className="container-max">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--gradient-primary)' }}
              >
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">Nexus Market</span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = 'var(--color-text-primary)';
                    (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'var(--color-text-secondary)';
                    (e.target as HTMLElement).style.background = 'transparent';
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 ${
                  searchFocused ? 'glass-strong' : 'glass'
                }`}
                style={{
                  border: searchFocused
                    ? '1px solid rgba(124,58,237,0.5)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: searchFocused ? '0 0 20px rgba(124,58,237,0.15)' : 'none',
                }}
              >
                <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: 'var(--color-text-primary)' }}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 ml-auto">
              <button className="btn-icon hidden md:flex" aria-label="Wishlist">
                <Heart size={16} />
              </button>

              {/* Cart Button */}
              <button
                id="cart-btn"
                className="btn-icon relative"
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingCart size={16} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span
                      key="badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full text-white text-xs font-bold"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      {totalItems > 9 ? '9+' : totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Auth Buttons */}
              <Link href="/dashboard" className="btn-primary hidden md:flex text-sm py-2 px-5">
                Dashboard
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="btn-icon md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-strong border-t"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <div className="container-max py-4 flex flex-col gap-2">
                {/* Mobile Search */}
                <div
                  className="flex items-center gap-3 px-4 py-2.5 rounded-full glass"
                  style={{ border: '1px solid var(--color-border)' }}
                >
                  <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: 'var(--color-text-primary)' }}
                  />
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 rounded-lg text-sm font-medium"
                    style={{ color: 'var(--color-text-secondary)', background: 'rgba(255,255,255,0.03)' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
