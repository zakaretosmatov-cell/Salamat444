'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { categories } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid() {
  return (
    <section className="py-20">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="section-badge">Browse Categories</span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Shop by{' '}
              <span className="gradient-text">Category</span>
            </h2>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-sm font-medium group" style={{ color: 'var(--color-accent-violet-light)' }}>
            View all
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={`/products?category=${cat.id}`}
                className="group block glass-card rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl bg-gradient-to-br ${cat.gradient} bg-opacity-15 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                  style={{ background: `linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))` }}
                >
                  {cat.icon}
                </div>

                {/* Name */}
                <h3 className="font-semibold text-sm mb-1" style={{ color: 'var(--color-text-primary)' }}>
                  {cat.name}
                </h3>

                {/* Count */}
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {cat.count.toLocaleString()} products
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
