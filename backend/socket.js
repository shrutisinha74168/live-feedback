let io;

const initSocket = (server) => {
  io = require('socket.io')(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

const emitFeedback = (feedback) => {
  if (io) io.emit('newFeedback', feedback);
};

module.exports = { initSocket, emitFeedback };
