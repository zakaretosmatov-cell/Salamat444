'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Shield, Truck } from 'lucide-react';

const stats = [
  { label: 'Active Sellers', value: '50K+', icon: TrendingUp },
  { label: 'Products Listed', value: '2M+', icon: Sparkles },
  { label: 'Happy Customers', value: '8M+', icon: Shield },
  { label: 'Countries', value: '120+', icon: Truck },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Animated gradient blob */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(37,99,235,0.05) 40%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-max relative z-10 py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-8"
          >
            <span className="section-badge">
              <Sparkles size={13} />
              World&apos;s #1 Premium Marketplace
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
          >
            Discover{' '}
            <span className="gradient-text-accent">Premium</span>
            <br />
            Products for Every
            <br />
            <span className="gradient-text">Lifestyle</span>
          </motion.h1>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Shop from over 2 million curated products across hundreds of categories.
            Premium quality, fast shipping, and an unmatched shopping experience.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/products">
              <button className="btn-primary text-base px-8 py-4 animate-pulse-glow">
                Explore Products
                <ArrowRight size={18} />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn-secondary text-base px-8 py-4">
                Seller Dashboard
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)' }}
                >
                  <Icon size={18} style={{ color: 'var(--color-accent-violet-light)' }} />
                </div>
                <div className="text-2xl font-bold gradient-text mb-1">{value}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center p-1"
          style={{ borderColor: 'rgba(255,255,255,0.15)' }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full"
            style={{ background: 'var(--color-accent-violet-light)' }}
          />
        </div>
        <span className="text-xs">Scroll to explore</span>
      </motion.div>
    </section>
  );
}
