require('dotenv').config();
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL no está definido en .env");
}

let connectionString = process.env.DATABASE_URL;
// Fuerza resolución IPv4 para evitar ECONNREFUSED en Dev.
connectionString = connectionString.replace('localhost', '127.0.0.1');

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Cliente con Adapter puro en lugar de HTTP Proxies de V7
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
