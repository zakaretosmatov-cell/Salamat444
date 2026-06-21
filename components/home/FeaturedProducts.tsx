'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { products } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export default function FeaturedProducts() {
  const featured = products.slice(0, 8);

  return (
    <section className="py-20" style={{ borderTop: '1px solid var(--color-border)' }}>
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
            <span className="section-badge">
              <Flame size={13} />
              Trending Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Featured{' '}
              <span className="gradient-text">Products</span>
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Handpicked by our editors, loved by thousands
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-2 text-sm font-medium group"
            style={{ color: 'var(--color-accent-violet-light)' }}
          >
            View all products
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <button className="btn-secondary text-base px-10 py-3.5">
              Explore All Products
              <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
