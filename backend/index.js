require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importar rutas y CRON Jobs
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const { initCronJobs } = require('./src/cron/stockSync');

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de Middlewares
app.use(cors());
app.use(express.json());

// Registro de Endpoints Principales
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Health Check / Sanity Test backend
app.get('/', (req, res) => {
  res.json({ status: 'Online', message: 'DropTech API funcionando correctamente.' });
});

// Levantamiento del Servidor Node y subsistemas
app.listen(PORT, () => {
  console.log(`🚀 Servidor Express levantado en http://localhost:${PORT}`);
  
  // Una vez levanta el servidor, arrancar de inmediato los hilos en segundo plano
  initCronJobs();
});
