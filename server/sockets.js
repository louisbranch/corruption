var io = require('socket.io');
var _ = require('lodash');
var room = require('./lib/room');

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;
  room = room.bind(io);

  var p1 = {id: 1, name: 'luiz'};
  var p2 = {id: 2, name: 'larissa'};

  sockets.on('connection', function (socket) {
    socket.emit('socket:connected');

    socket.on('socket:join:room', function (data) {
      room(data.room).join(socket);
    });

    socket.on('game:start', function (data) {
    });

    // TODO
    socket.on('nextPhase', function (data) {});
    socket.on('endTurn', function (data) {});
    socket.on('startCombat', function (data) {});
    socket.on('addToAttackQueue', function (data) {});

    socket.on('castCard', function (data) {
      socket.get('pid', function (pid) {
        console.log(pid);
        socket.broadcast.emit('player:castCard', pid);
      });
    });

  });

};
