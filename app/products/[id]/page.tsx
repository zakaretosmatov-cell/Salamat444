import type { Metadata } from 'next';
import { products } from '@/lib/data';
import ProductDetailClient from '@/components/products/ProductDetailClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(p => p.id === id);
  return {
    title: product?.name ?? 'Product Not Found',
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailClient id={id} />;
}
