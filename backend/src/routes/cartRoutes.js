const express = require('express');
const prisma = require('../lib/prisma');

const router = express.Router();

// POST /api/cart/add
// Agrega un producto o suma su cantidad si ya existe
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    // 1. Validar carrito
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    // 2. Insertar o actualizar el item en el carrito (Upsert)
    const cartItem = await prisma.cartItem.upsert({
      where: {
        cartId_productId: { cartId: cart.id, productId }
      },
      update: {
        quantity: { increment: quantity || 1 }
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: quantity || 1
      }
    });

    res.json(cartItem);
  } catch (error) {
    console.error('Error add to cart:', error);
    res.status(500).json({ message: 'Error al agregar el producto al carrito' });
  }
});

// GET /api/cart/:userId
// Obtener todos los productos dentro del carrito de un usuario
router.get('/:userId', async (req, res) => {
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: req.params.userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });
    res.json(cart || { items: [] });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error obteniendo el carrito' });
  }
});

module.exports = router;
