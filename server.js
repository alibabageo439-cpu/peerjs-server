const { PeerServer } = require('peer');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
  res.send('PeerJS Server Running! ✅');
});

const peerServer = PeerServer({
  port: PORT,
  path: '/',
  allow_discovery: true,
  proxied: true,
  alive_timeout: 60000,
  key: 'peerjs',
  concurrent_limit: 5000,
  cleanup_out_msgs: 1000,
});

peerServer.on('connection', (client) => {
  console.log('Client connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Client disconnected:', client.getId());
});

console.log(`PeerJS server running on port ${PORT}`);
