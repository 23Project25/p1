const http = require('http');

// Create a basic server
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from Node.js!\n');
});
const PORT = 4000; // or any free port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});