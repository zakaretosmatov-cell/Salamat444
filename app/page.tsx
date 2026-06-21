import HeroSection from '@/components/home/HeroSection';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import PerksSection from '@/components/home/PerksSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PerksSection />
      <CategoryGrid />
      <FeaturedProducts />
    </>
  );
}
