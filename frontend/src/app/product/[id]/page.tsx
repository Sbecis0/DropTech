import React from 'react';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  let product = null;

  try {
    const res = await fetch(`http://127.0.0.1:5000/api/products/${id}`, { cache: 'no-store' });
    if (res.ok) product = await res.json();
  } catch (err) {
    console.error("Error al obtener detalle del producto:", err);
  }

  if (!product) {
    return (
      <div className="min-h-screen py-40 flex flex-col items-center justify-center bg-white text-black">
        <h1 className="text-4xl font-semibold mb-4 tracking-tight">Producto no encontrado</h1>
        <p className="text-gray-500 mb-8">El artículo buscado no existe o no hay conexión con la API.</p>
        <Link href="/" className="px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors font-medium">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      {/* Visual representation */}
      <div className="aspect-square bg-gray-50 dark:bg-neutral-900 flex items-center justify-center text-[12rem] rounded-[2.5rem] border border-gray-100 dark:border-neutral-800 overflow-hidden shadow-inner relative">
        {product.imageUrl?.startsWith('http') ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 cursor-crosshair" />
        ) : (
          <div className="transform hover:scale-110 transition-transform duration-700 cursor-crosshair">
            {product.imageUrl || '📦'}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col">
        <div className="inline-flex max-w-max items-center px-2 py-1 rounded border border-gray-200 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
          SKU: {product.cj_sku}
        </div>
        
        <h1 className="text-4xl md:text-5xl font-semibold text-black mb-6 leading-tight tracking-tight">
          {product.name}
        </h1>
        
        <p className="text-lg text-gray-500 mb-10 leading-relaxed font-light">
          {product.description || "Lleva la innovación a tu hogar con este accesorio imprescindible de alta precisión."}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-10">
          <span className="text-5xl font-semibold tracking-tighter text-black">
            €{product.price}
          </span>
          <span className="text-sm text-black font-medium pb-2 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
             {product.local_stock} uds en España (24h)
          </span>
        </div>

        <AddToCartButton product={product} />

        <div className="mt-12 text-sm text-gray-500 border-t border-gray-100 pt-8 flex gap-4 font-medium">
          <Link href="/" className="hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">&larr;  Volver al Catálogo y Ofertas</Link>
        </div>
      </div>
    </div>
  );
}
