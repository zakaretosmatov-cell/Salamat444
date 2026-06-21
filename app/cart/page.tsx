'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ArrowRight, Shield, Truck } from 'lucide-react';

export default function CartPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, totalItems } = useCart();

  return (
    <div className="container-max py-8 pt-24 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/products" className="btn-icon">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              <ShoppingBag size={40} style={{ color: 'var(--color-accent-violet-light)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
            <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Looks like you haven&#39;t added anything yet. Let&#39;s fix that!
            </p>
            <Link href="/products">
              <button className="btn-primary px-10 py-3.5">
                Start Shopping
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card rounded-2xl p-5 flex gap-5"
                >
                  {/* Image */}
                  <Link href={`/products/${item.product.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                      unoptimized
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold hover:opacity-80 transition-opacity line-clamp-2 mb-1">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xs capitalize mb-3" style={{ color: 'var(--color-text-muted)' }}>
                      {item.product.category}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div
                        className="flex items-center gap-2 rounded-full px-2 py-1"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}
                      >
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-bold gradient-text">{formatPrice(item.product.price * item.quantity)}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                          {formatPrice(item.product.price)} each
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div className="glass-card rounded-2xl p-6 sticky top-24">
                <h2 className="font-bold text-lg mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Subtotal ({totalItems} items)</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Shipping</span>
                    <span className="text-green-400 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Tax (10%)</span>
                    <span>{formatPrice(totalPrice * 0.1)}</span>
                  </div>
                  <hr className="divider" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="gradient-text">{formatPrice(totalPrice * 1.1)}</span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="input-glass flex-1 text-sm"
                  />
                  <button className="btn-secondary text-sm px-4 py-2">Apply</button>
                </div>

                <button className="btn-primary w-full justify-center py-3.5 text-base mb-3">
                  Proceed to Checkout
                  <ArrowRight size={16} />
                </button>

                <Link href="/products">
                  <button className="btn-secondary w-full justify-center py-3">
                    Continue Shopping
                  </button>
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-6 space-y-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  {[
                    { icon: Shield, text: 'Secure SSL Checkout' },
                    { icon: Truck, text: 'Free shipping on this order' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      <Icon size={13} style={{ color: 'var(--color-accent-violet-light)' }} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
