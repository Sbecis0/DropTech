const prisma = require('./src/lib/prisma');
async function test() {
  try {
    const res = await prisma.product.findMany();
    console.log("Success", res);
  } catch (e) {
    console.error("Prisma Error:", e);
  }
}
test();
