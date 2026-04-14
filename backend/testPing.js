const http = require('http');
console.log("Pinging Express...");
const req = http.get('http://127.0.0.1:5000/api/products', (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => { console.log("DATA:", rawData.substring(0, 100) + '...'); });
}).on('error', (e) => {
  console.error("Got error:", e.message);
});
req.setTimeout(3000, () => {
    console.error("Timeout!");
    req.destroy();
});
