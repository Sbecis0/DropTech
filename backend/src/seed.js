const prisma = require('./lib/prisma');

async function main() {
  console.log('🌱 Eliminando catálogo antiguo y limpiando el sistema...');
  await prisma.product.deleteMany({}); 
  
  console.log('📦 Insertando el producto con Fotos Reales...');
  
  await prisma.product.createMany({
    data: [
      {
        name: "Himalayan Skin Phone Case",
        description: "Carcasa premium de textura Himalaya para teléfono. Protección total con un acabado de lujo que hace que tu dispositivo destaque. Referencia oficial CJ: CJSY142615401AZ.",
        price: 29.99,
        cj_sku: "CJSY142615401AZ",
        imageUrl: "https://oss-cf.cjdropshipping.com/product/2026/04/14/09/cecdc32e-f961-49d4-8ba5-9efd43dfc874.jpg",
        local_stock: 124
      },
      {
        name: "Auriculares Bone Neo Clip",
        description: "Tecnología de conducción ósea avanzada. Audio nítido sin aislarte de tu entorno. Diseño ciberpunk de clip para máxima comodidad.",
        price: 89.99,
        cj_sku: "CJXX992211A",
        imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
        local_stock: 45
      },
      {
        name: "Trípode Inteligente IA",
        description: "Tu cámara personal inteligente. Te sigue mientras grabas con rotación suave y precisa gracias a su microprocesador.",
        price: 110.00,
        cj_sku: "CJTRIPOD360",
        imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop",
        local_stock: 18
      }
    ]
  });

  console.log('✅ Catálogo poblado con éxito con URLs de imágenes');
}

main()
  .catch((e) => {
    console.error('❌ Fallo al poblar base de datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
