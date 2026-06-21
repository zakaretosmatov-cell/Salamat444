import type { Metadata } from 'next';
import ProductsClient from '@/components/products/ProductsClient';

export const metadata: Metadata = {
  title: 'Shop All Products',
  description: 'Browse thousands of premium products across all categories.',
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <ProductsClient initialCategory={category} />;
}
