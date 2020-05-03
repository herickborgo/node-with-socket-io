import express, { json, urlencoded } from 'express';
import socket from 'socket.io';

import register_channel from './functions/register_channel';

const app = express();

let io = null;

app.use(json());
app.use(urlencoded({
  extended: true,
}));

app.post('/register-channel', (request, response) => {
  register_channel(request, response, app, io);
});

export default () => {
  return {
    server: (server) => {
      io = socket(server);
    },
    app,
  }
}
