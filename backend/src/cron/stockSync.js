const cron = require('node-cron');
const prisma = require('../lib/prisma');
const { getSpainStock } = require('../services/cjDropshipping');

// Esta función permite configurar y arrancar todos los Cron Jobs de nuestra arquitectura
function initCronJobs() {
  
  // Programado para ejecutarse cada 4 horas: '0 */4 * * *'
  cron.schedule('0 */4 * * *', async () => {
    console.log('⏰ Inciando CRON: Sincronizando stock local con CJ Dropshipping...');
    
    try {
      // 1. Obtener todos los SKUs que manejamos en BD
      const products = await prisma.product.findMany({ select: { cj_sku: true } });
      const skus = products.map(p => p.cj_sku);
      
      if (skus.length === 0) {
        console.log('ℹ️ No hay productos en BD para sincronizar todavía.');
        return;
      }

      // 2. Traer la información filtrada de España desde CJ API
      const stockUpdates = await getSpainStock(skus);

      // 3. Procesar las actualizaciones en BD (PostgreSQL) iterando el array
      let updatedCount = 0;
      for (const update of stockUpdates) {
        await prisma.product.updateMany({
          where: { cj_sku: update.cj_sku },
          data: { local_stock: update.local_stock }
        });
        updatedCount++;
      }

      console.log(`✅ CRON Terminado: Sincronización exitosa. ${updatedCount} productos comprobados/actualizados.`);
    } catch (error) {
      console.error('❌ CRON Falló (Sincronización Inventario):', error.message);
    }
  });

  console.log('🕒 Sistema de Cron Jobs inicializado en segundo plano.');
}

module.exports = { initCronJobs };
