const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// GET /api/products
// Retorna el catálogo completo con orden de novedad
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error interno obteniendo productos' });
  }
});

// GET /api/products/:id
// Detalle individual de un producto
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Error interno obteniendo detalle del producto' });
  }
});

module.exports = router;
