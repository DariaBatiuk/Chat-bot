const http = require('http');
const httpProxy = require('http-proxy');
const { config } = require('dotenv');

config();

const PORT = process.env.PORT || 8080

// Create a proxy server
const proxy = httpProxy.createProxyServer({ changeOrigin: true });

//Proxy request options
const proxyOptions = {
  target: 'https://api.openai.com', 
  secure: true, 
  changeOrigin: true,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`
  }
};

// Create server
const server = http.createServer((req, res) => proxy.web(req, res, proxyOptions));

server.listen(process.env.PORT || 8080, () => console.log(`Proxy api.openapi.com listen: ${PORT}`));
