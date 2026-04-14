import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import { fetchProducts } from '@/lib/api';

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Hero />
        <ProductGrid products={products} />
      </main>
      
      <footer className="border-t border-black/10 py-12 text-center text-gray-500 text-sm bg-white mt-10">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} NEXUSGEAR. Tech Dropshipping Demo.</p>
        </div>
      </footer>
    </>
  );
}
