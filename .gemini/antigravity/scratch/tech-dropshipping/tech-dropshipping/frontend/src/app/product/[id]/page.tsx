import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import Header from '@/components/Header';
import { fetchProductById } from '@/lib/api';
import AddToCartButton from './AddToCartButton';

// Dynamic SEO Metadata Generation
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.id);

  if (!product) {
    return { title: 'Product Not Found | NEXUSGEAR' };
  }

  return {
    title: `${product.name} - NEXUSGEAR`,
    description: product.description || `Buy the ${product.name} with fast 24/48h delivery in Spain. Premium tech curated for you.`,
    openGraph: {
      title: `${product.name} | Premium Tech`,
      description: `In stock in Spain: ${product.stock} units left. Order now.`,
      images: [product.image],
    }
  };
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  const product = await fetchProductById(resolvedParams.id);

  if (!product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-32 text-center h-screen flex flex-col justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-6">Product Not Found.</h1>
          <Link href="/" className="apple-link justify-center">Return Home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-20 pb-24 bg-[#f5f5f7]">
        {/* Top Minimal Breadcrumb/Nav */}
        <div className="border-b border-black/5 bg-[#ffffff]/80 backdrop-blur-md sticky top-14 z-40">
          <div className="container mx-auto px-4 h-12 flex items-center justify-between">
            <h2 className="font-semibold text-lg text-[#1d1d1f] tracking-tight">{product.name}</h2>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="hidden sm:block text-gray-500">From ${product.price.toFixed(2)}</span>
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8">
          <Link href="/#products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-12 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Link>
          
          <div className="flex flex-col items-center">
            <div className="text-center max-w-3xl mb-12">
               <h1 className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight mb-6">{product.name}</h1>
               <p className="text-2xl text-gray-500 font-medium tracking-tight">The ultimate dropshipped tech experience.</p>
               
               <div className="mt-8 text-[11px] font-semibold tracking-widest uppercase text-green-600 inline-flex items-center">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                 In Stock in Spain - {product.stock} units
               </div>
            </div>

            {/* Huge Hero Image */}
            <div className="w-full max-w-5xl relative aspect-square md:aspect-video rounded-3xl overflow-hidden bg-white shadow-sm flex items-center justify-center p-8 md:p-16">
              {product.image && (
                <Image 
                  src={product.image} 
                  alt={product.name}
                  fill
                  className="object-contain p-8 md:p-16 object-center"
                  priority
                />
              )}
            </div>
            
            <div className="max-w-3xl mx-auto mt-20 text-center space-y-8 text-xl font-medium text-gray-600 tracking-tight leading-relaxed">
              <p>
                Experience next-level technology designed to seamlessly integrate into your daily life. Engineered for performance and wrapped in a premium minimalist aesthetic. 
              </p>
              <p className="text-[#1d1d1f]">
                {product.description || "Ultra-low latency connectivity. Premium aerospace-grade materials. Direct delivery from our local facility within 24-48 hours."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
