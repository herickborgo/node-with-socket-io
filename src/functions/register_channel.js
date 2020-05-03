export default (request, response, app, io) => {
  let error = false;

  request.body.forEach((config) => {
    if (error) return;

    const route = app._router.stack.find(stack => stack.route ? stack.route.path === config.path : null);
    if (route) {
      error = true;
      response.status(400).send({ message: `Channel ${config.path} already exists` });
    } else {
      app.post(config.path, (request, response) => {
        io.of(config.path).to(config.socket).emit(config.socket, (request.body));
        response.status(200).send({ message: 'Success' });
      });

      io.of(config.path).on('connection', (socket) => {
        console.log(`Socket conectado: ${socket.id}`);

        socket.join(config.socket);

        socket.emit('room', { room: config.socket });
      });
    }
  });

  response.status(201).send({ message: 'Created channels' });
};
