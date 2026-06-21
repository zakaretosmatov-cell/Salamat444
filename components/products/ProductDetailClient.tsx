'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { products } from '@/lib/data';
import { reviews } from '@/lib/data';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice, getDiscountPercent } from '@/lib/utils';
import {
  Star, ShoppingCart, Heart, Share2, ArrowLeft,
  Shield, Truck, RotateCcw, Check
} from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailClient({ id }: { id: string }) {
  const product = products.find(p => p.id === id);
  if (!product) notFound();

  const { addToCart, isInCart } = useCart();
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);
  const inCart = isInCart(product.id);

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? getDiscountPercent(product.originalPrice, product.price) : null;

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 2000);
  };

  return (
    <div className="container-max py-8 pt-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span style={{ color: 'var(--color-text-secondary)' }} className="truncate">{product.name}</span>
      </div>

      {/* Back */}
      <Link href="/products" className="inline-flex items-center gap-2 mb-6 text-sm group" style={{ color: 'var(--color-text-secondary)' }}>
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to products
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden glass-card"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
          {product.badge && (
            <div className="absolute top-4 left-4">
              <span className={`badge badge-${product.badge}`}>
                {product.badge === 'sale' && discount ? `-${discount}%` : product.badge}
              </span>
            </div>
          )}
          <button
            className="absolute top-4 right-4 btn-icon"
            style={{
              color: wished ? '#f43f5e' : 'var(--color-text-secondary)',
              background: 'rgba(0,0,0,0.5)',
            }}
            onClick={() => setWished(!wished)}
          >
            <Heart size={18} fill={wished ? '#f43f5e' : 'none'} />
          </button>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col"
        >
          {/* Category */}
          <span className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--color-accent-violet-light)' }}>
            {product.category}
          </span>

          {/* Name */}
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16}
                  fill={s <= Math.round(product.rating) ? '#f59e0b' : 'transparent'}
                  stroke={s <= Math.round(product.rating) ? '#f59e0b' : '#64748b'}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold gradient-text">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl line-through" style={{ color: 'var(--color-text-muted)' }}>
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="badge badge-sale">Save {discount}%</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            {product.description}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6 text-sm">
            {product.inStock ? (
              <>
                <Check size={15} className="text-green-400" />
                <span className="text-green-400 font-medium">In Stock</span>
                <span style={{ color: 'var(--color-text-muted)' }}>· Ready to ship</span>
              </>
            ) : (
              <span className="text-red-400 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          {product.inStock && (
            <div className="flex items-center gap-4 mb-6">
              {/* Qty */}
              <div
                className="flex items-center gap-2 rounded-full px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}
              >
                <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 font-bold" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="w-8 text-center font-semibold">{qty}</span>
                <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 font-bold" onClick={() => setQty(qty + 1)}>+</button>
              </div>

              <button className="btn-primary flex-1 py-3.5 justify-center" onClick={handleAddToCart}>
                <ShoppingCart size={18} />
                {addedAnim ? '✓ Added to Cart!' : inCart ? 'Add More' : 'Add to Cart'}
              </button>

              <button className="btn-icon" aria-label="Share">
                <Share2 size={16} />
              </button>
            </div>
          )}

          {/* Perks */}
          <div className="space-y-3 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
            {[
              { icon: Truck, text: 'Free shipping on orders over $50' },
              { icon: RotateCcw, text: '30-day easy returns' },
              { icon: Shield, text: 'Secure checkout with SSL encryption' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <Icon size={15} style={{ color: 'var(--color-accent-violet-light)' }} />
                {text}
              </div>
            ))}
          </div>

          {/* Seller */}
          <div
            className="mt-6 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-border)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {product.seller.avatar}
            </div>
            <div>
              <div className="text-sm font-semibold">{product.seller.name}</div>
              <div className="text-xs flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                <Star size={10} fill="#f59e0b" stroke="#f59e0b" />
                {product.seller.rating} seller rating
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reviews */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{review.user}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{review.date}</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={12} fill={s <= review.rating ? '#f59e0b' : 'transparent'} stroke={s <= review.rating ? '#f59e0b' : '#64748b'} />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
