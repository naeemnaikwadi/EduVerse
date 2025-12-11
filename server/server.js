require('dotenv').config();

const app = require('./app');
const http = require('http');

const server = http.createServer(app);

console.log('🚫 Socket.IO removed for deployment compatibility');

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
