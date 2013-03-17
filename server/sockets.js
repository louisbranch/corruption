var io = require('socket.io');

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;

  var luiz = {id: 1, name: 'luiz', current: true};
  var larissa = {id: 2, name: 'larissa'};

  sockets.on('connection', function (socket) {

    socket.emit('setPlayers', { players: [luiz, larissa] });

    socket.on('my other event', function (data) {
      console.log(data);
    });
  });

};

