var io = require('socket.io');
var _ = require('lodash');
var game = require('./lib/game');

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;
  game = game.bind(sockets);

  sockets.on('connection', function (socket) {
    socket.emit('socket:connected');

    socket.on('socket:join:game', function (data) {
      game(data.game).join(socket, data);
    });

  });

};
