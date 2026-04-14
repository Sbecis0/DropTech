require('dotenv').config();
const axios = require('axios');

async function testApi() {
  const apiKey = process.env.CJ_API_KEY;
  try {
    const authRes = await axios.post('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
      apiKey: apiKey
    });
    const token = authRes.data.data.accessToken;

    const listRes = await axios.get(`https://developers.cjdropshipping.com/api2.0/v1/product/list?sku=CJSY142615401AZ&page=1&size=5`, {
      headers: { 'CJ-Access-Token': token }
    });
    console.log("LIST BY SKU:", listRes.data.data?.list?.length);

    const listRes2 = await axios.get(`https://developers.cjdropshipping.com/api2.0/v1/product/list?productSku=CJSY142615401AZ&page=1&size=5`, {
      headers: { 'CJ-Access-Token': token }
    });
    console.log("LIST BY PRODUCTSKU:", listRes2.data.data?.list?.length);
    
  } catch (err) {
    console.error("❌ Error API:", err.message);
  }
}
testApi();
