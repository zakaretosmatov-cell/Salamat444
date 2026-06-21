'use client';

import { motion } from 'framer-motion';
import { Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

const perks = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $50. Fast 2-3 day delivery worldwide.',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day hassle-free return policy. No questions asked.',
    gradient: 'from-purple-600 to-violet-500',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: '256-bit SSL encryption. Your data is always safe.',
    gradient: 'from-green-600 to-emerald-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is always available to help you anytime.',
    gradient: 'from-pink-600 to-rose-500',
  },
];

export default function PerksSection() {
  return (
    <section className="py-16">
      <div className="container-max">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map(({ icon: Icon, title, description, gradient }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 flex gap-4 items-start"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${gradient}`}
                style={{ opacity: 0.9 }}
              >
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
