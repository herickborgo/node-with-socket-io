const express = require('express');
const crypto = require('crypto');
const debug = require('debug')('nodeapi:server');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.post('/', (req, res, next) => {
  req.body.forEach(config => {
    app.post(config.url, (req, res) => {
      io.sockets
      res.status(200).send({
        socket: config.socket,
      });
    });
    io.of(config.url).on('connection', (socket) => {
      console.log(`Socket conectado: ${socket.id}`);

      socket.on('generateToken', () => {
        const token = crypto.createHash('sha1').update(Date.now().toString()).digest('hex');
        tokens.push(token);
        io.sockets.emit('token', token);
      });
    });
  });
  res.status(201).json(req.body);
});

server.listen(3000);
