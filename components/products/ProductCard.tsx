'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [wished, setWished] = useState(false);
  const inCart = isInCart(product.id);
  const discount = product.originalPrice
    ? getDiscountPercent(product.originalPrice, product.price)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative glass-card rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
        >
          <Link href={`/products/${product.id}`}>
            <button className="btn-icon bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Eye size={16} />
            </button>
          </Link>
          <button
            className="btn-icon bg-white/10 hover:bg-white/20 border-white/20"
            style={{ color: inCart ? 'var(--color-accent-violet-light)' : 'white' }}
            onClick={() => addToCart(product)}
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`badge badge-${product.badge}`}>
              {product.badge === 'sale' && discount ? `-${discount}%` : product.badge}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 btn-icon opacity-0 group-hover:opacity-100 transition-all duration-200"
          style={{
            color: wished ? '#f43f5e' : 'white',
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.15)',
          }}
          onClick={() => setWished(!wished)}
          aria-label="Toggle wishlist"
        >
          <Heart size={14} fill={wished ? '#f43f5e' : 'none'} />
        </button>

        {/* Stock badge */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          >
            <span className="badge" style={{ background: 'rgba(0,0,0,0.8)', color: 'var(--color-text-muted)', border: '1px solid rgba(255,255,255,0.1)' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: 'var(--color-accent-violet-light)' }}>
          {product.category}
        </p>

        {/* Name */}
        <Link href={`/products/${product.id}`}>
          <h3
            className="font-semibold text-sm leading-snug mb-2 hover:opacity-80 transition-opacity line-clamp-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={12}
                fill={star <= Math.round(product.rating) ? '#f59e0b' : 'transparent'}
                stroke={star <= Math.round(product.rating) ? '#f59e0b' : '#64748b'}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-lg gradient-text">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs ml-2 line-through" style={{ color: 'var(--color-text-muted)' }}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.inStock && (
            <button
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                inCart ? 'btn-secondary !py-2' : 'btn-primary !py-2'
              }`}
              onClick={() => addToCart(product)}
            >
              {inCart ? 'In Cart ✓' : 'Add'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
