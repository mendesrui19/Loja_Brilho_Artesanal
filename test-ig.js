const https = require('https');

https.get('https://www.instagram.com/p/DY4zwhYCO10/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<meta property="og:image" content="([^"]+)"/);
    console.log(match ? match[1] : 'Not found');
  });
});
