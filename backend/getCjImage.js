require('dotenv').config();
const axios = require('axios');

async function getImage() {
  const authRes = await axios.post('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    apiKey: process.env.CJ_API_KEY
  });
  const token = authRes.data.data.accessToken;

  // Buscar por keyword = SKU
  const listRes = await axios.get('https://developers.cjdropshipping.com/api2.0/v1/product/list?sku=CJSY142615401AZ&page=1&size=1', {
    headers: { 'CJ-Access-Token': token }
  });

  const items = listRes.data?.data?.list;
  if (!items || items.length === 0) {
    console.log("No encontrado por sku, probando keyword...");
    // Probar con el SPU directamente en query
    const q = await axios.get('https://developers.cjdropshipping.com/api2.0/v1/product/list?keyword=CJSY142615401AZ&page=1&size=1', {
      headers: { 'CJ-Access-Token': token }
    });
    const items2 = q.data?.data?.list;
    if(items2 && items2.length > 0) {
      console.log("IMAGE_URL:", items2[0].productImage);
      console.log("PRODUCT_NAME:", items2[0].productNameEn || items2[0].productName);
      console.log("PID:", items2[0].pid);
    } else {
      console.log("Producto no encontrado en list.");
    }
    return;
  }
  console.log("IMAGE_URL:", items[0].productImage);
  console.log("PRODUCT_NAME:", items[0].productNameEn || items[0].productName);
  console.log("PID:", items[0].pid);
}

getImage().catch(console.error);
