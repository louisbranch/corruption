var io = require('socket.io');
var _ = require('lodash');
var room = require('./lib/room');

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;
  room = room.bind(io);

  sockets.on('connection', function (socket) {
    socket.emit('socket:connected');

    socket.on('socket:join:room', function (data) {
      room(data.room).join(socket);
    });

  });

};
