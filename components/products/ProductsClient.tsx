'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/products/ProductCard';
import { Search, SlidersHorizontal, Grid3X3, List, X, ChevronDown } from 'lucide-react';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
];

export default function ProductsClient({ initialCategory }: { initialCategory?: string }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    let list = [...products];

    // Search
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Category
    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Price
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'reviews': list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return list;
  }, [search, selectedCategory, sort, priceRange]);

  return (
    <div className="container-max py-8 pt-24">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          {selectedCategory
            ? categories.find(c => c.id === selectedCategory)?.name || 'Products'
            : 'All Products'}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>
      </motion.div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside
          className={`${showFilters ? 'block' : 'hidden'} lg:block w-64 flex-shrink-0`}
        >
          <div className="glass-card rounded-2xl p-6 sticky top-24 space-y-6">
            <h2 className="font-bold">Filters</h2>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>Category</h3>
              <div className="space-y-1.5">
                <button
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    !selectedCategory ? 'font-semibold' : ''
                  }`}
                  style={{
                    background: !selectedCategory ? 'rgba(124,58,237,0.15)' : 'transparent',
                    color: !selectedCategory ? 'var(--color-accent-violet-light)' : 'var(--color-text-secondary)',
                    border: !selectedCategory ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                  }}
                  onClick={() => setSelectedCategory('')}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                    style={{
                      background: selectedCategory === cat.id ? 'rgba(124,58,237,0.15)' : 'transparent',
                      color: selectedCategory === cat.id ? 'var(--color-accent-violet-light)' : 'var(--color-text-secondary)',
                      border: selectedCategory === cat.id ? '1px solid rgba(124,58,237,0.25)' : '1px solid transparent',
                    }}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                    <span className="ml-auto float-right text-xs opacity-50">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="divider" />

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>Price Range</h3>
              <div className="flex items-center justify-between text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={500}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-violet-600"
              />
            </div>

            {/* Reset */}
            {(selectedCategory || search) && (
              <button
                className="btn-secondary w-full text-sm justify-center py-2"
                onClick={() => { setSelectedCategory(''); setSearch(''); }}
              >
                <X size={14} />
                Reset Filters
              </button>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center gap-3 mb-6">
            {/* Search */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-full flex-1 max-w-md glass"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <Search size={15} style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--color-text-primary)' }}
              />
              {search && (
                <button onClick={() => setSearch('')}>
                  <X size={13} style={{ color: 'var(--color-text-muted)' }} />
                </button>
              )}
            </div>

            {/* Filter toggle mobile */}
            <button
              className="btn-icon lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="Toggle filters"
            >
              <SlidersHorizontal size={16} />
            </button>

            {/* Sort */}
            <div className="relative ml-auto">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="input-glass pr-8 text-sm appearance-none cursor-pointer"
                style={{ paddingRight: '2rem' }}
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value} style={{ background: '#0d0d1a' }}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--color-text-muted)' }}
              />
            </div>

            {/* View mode */}
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: '1px solid var(--color-border)' }}
            >
              <button
                className="p-2.5 transition-colors"
                style={{
                  background: viewMode === 'grid' ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: viewMode === 'grid' ? 'var(--color-accent-violet-light)' : 'var(--color-text-muted)',
                }}
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
              >
                <Grid3X3 size={15} />
              </button>
              <button
                className="p-2.5 transition-colors"
                style={{
                  background: viewMode === 'list' ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: viewMode === 'list' ? 'var(--color-accent-violet-light)' : 'var(--color-text-muted)',
                }}
                onClick={() => setViewMode('list')}
                aria-label="List view"
              >
                <List size={15} />
              </button>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'
                  : 'flex flex-col gap-4'
              }
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
