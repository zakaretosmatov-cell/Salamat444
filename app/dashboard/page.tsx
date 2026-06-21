'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp, ShoppingBag, DollarSign, Users,
  Package, ArrowUpRight, ArrowDownRight, Star
} from 'lucide-react';
import { mockOrders, products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { label: 'Total Revenue', value: '$48,291', change: '+12.5%', up: true, icon: DollarSign, color: 'from-violet-600 to-purple-600' },
  { label: 'Total Orders', value: '1,284', change: '+8.2%', up: true, icon: ShoppingBag, color: 'from-blue-600 to-cyan-600' },
  { label: 'Active Customers', value: '3,847', change: '+24.1%', up: true, icon: Users, color: 'from-emerald-600 to-green-600' },
  { label: 'Products Listed', value: '247', change: '-2.3%', up: false, icon: Package, color: 'from-pink-600 to-rose-600' },
];

const statusColors: Record<string, string> = {
  delivered: 'text-green-400',
  shipped: 'text-blue-400',
  processing: 'text-amber-400',
  pending: 'text-gray-400',
  cancelled: 'text-red-400',
};

export default function DashboardPage() {
  return (
    <div className="container-max py-8 pt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back! Here&#39;s what&#39;s happening.</p>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
            <button className="btn-primary text-sm py-2.5">
              <TrendingUp size={15} />
              Analytics
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(({ label, value, change, up, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${color}`}>
                <Icon size={20} className="text-white" />
              </div>
              <span
                className={`flex items-center gap-1 text-sm font-semibold ${up ? 'text-green-400' : 'text-red-400'}`}
              >
                {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
              </span>
            </div>
            <div className="text-2xl font-bold mb-1">{value}</div>
            <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Recent Orders</h2>
              <Link href="/cart" className="text-sm" style={{ color: 'var(--color-accent-violet-light)' }}>
                View all
              </Link>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={order.items[0].product.image}
                      alt={order.items[0].product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{order.id}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {order.items.length} item{order.items.length > 1 ? 's' : ''} · {order.date}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm gradient-text">{formatPrice(order.total)}</div>
                    <div className={`text-xs font-medium capitalize mt-0.5 ${statusColors[order.status]}`}>
                      ● {order.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg">Top Products</h2>
            <Link href="/products" className="text-sm" style={{ color: 'var(--color-accent-violet-light)' }}>
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {products.slice(0, 5).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
              >
                <Link href={`/products/${product.id}`} className="flex items-center gap-3 group">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-1 group-hover:text-violet-400 transition-colors">
                      {product.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star size={10} fill="#f59e0b" stroke="#f59e0b" />
                      <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {product.rating} · {product.reviewCount.toLocaleString()} reviews
                      </span>
                    </div>
                  </div>
                  <div className="text-sm font-bold gradient-text flex-shrink-0">
                    {formatPrice(product.price)}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
