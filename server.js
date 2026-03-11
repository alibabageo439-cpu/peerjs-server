const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 9000;

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('PeerJS Server Running!');
});

const peerServer = ExpressPeerServer(server, {
  allow_discovery: true,
  key: 'peerjs',
});

app.use('/', peerServer);

peerServer.on('connection', (client) => {
  console.log('Connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Disconnected:', client.getId());
});

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
