'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md flex flex-col"
            style={{
              background: '#0d0d1a',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid var(--color-border)' }}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} style={{ color: 'var(--color-accent-violet-light)' }} />
                <h2 className="font-bold text-lg">Shopping Cart</h2>
                {items.length > 0 && (
                  <span
                    className="badge"
                    style={{ background: 'rgba(124,58,237,0.15)', color: 'var(--color-accent-violet-light)', border: '1px solid rgba(124,58,237,0.3)' }}
                  >
                    {items.length}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    className="text-xs px-3 py-1.5 rounded-full transition-colors duration-200"
                    style={{ color: 'var(--color-text-muted)', background: 'rgba(255,255,255,0.04)' }}
                    onClick={clearCart}
                  >
                    Clear all
                  </button>
                )}
                <button className="btn-icon" onClick={onClose} aria-label="Close cart">
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
                  >
                    <ShoppingBag size={32} style={{ color: 'var(--color-accent-violet-light)' }} />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Your cart is empty</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                      Add some amazing products to get started
                    </p>
                  </div>
                  <button className="btn-primary" onClick={onClose}>
                    <Link href="/products">Start Shopping</Link>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass-card rounded-xl p-4 flex gap-4"
                    >
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-snug line-clamp-2 mb-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm font-bold" style={{ color: 'var(--color-accent-violet-light)' }}>
                          {formatPrice(item.product.price)}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-2">
                          <div
                            className="flex items-center gap-1 rounded-full p-1"
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                          >
                            <button
                              className="w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              className="w-6 h-6 flex items-center justify-center rounded-full transition-colors hover:bg-white/10"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div
                className="px-6 py-6 space-y-4"
                style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(0,0,0,0.3)' }}
              >
                {/* Subtotal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <hr className="divider" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="gradient-text">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/cart" onClick={onClose}>
                  <button className="btn-primary w-full justify-center py-3.5">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>
                </Link>

                <button
                  className="btn-secondary w-full justify-center py-3"
                  onClick={onClose}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
