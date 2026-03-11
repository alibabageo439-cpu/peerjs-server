const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 9000;

app.get('/', (req, res) => {
  res.send('PeerJS Server Running!');
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: true,
  key: 'peerjs',
});

app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => {
  console.log('Connected:', client.getId());
});

peerServer.on('disconnect', (client) => {
  console.log('Disconnected:', client.getId());
});
