const express = require("express");

const CONTENTS_PORT = 3000;
const SOCKET_PORT = 3001;
const app = express();
const WebSocket = require('ws')
const wss = new WebSocket.Server({port: SOCKET_PORT})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('something');
  });
  ws.send('something');
});

app.use(express.static('../client'));

app.listen(CONTENTS_PORT, ()=> console.log(`Server started on port: ${CONTENTS_PORT}`))