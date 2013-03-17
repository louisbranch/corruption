var io = require('socket.io');

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;

  var p1 = {id: 1, name: 'luiz'};
  var p2 = {id: 2, name: 'larissa'};

  sockets.on('connection', function (socket) {

    //socket.set('pid', pid++);

    socket.on('game:join', function (data) {
    });

    socket.on('game:start', function (data) {
      socket.emit('setPlayers', { p1: p1, p2: p2 });
    });

  });

  //_.each(game.players, function (player) {
  //  player.setDeck(new FakeDeck());
  //  player.drawHand();
  //  player.render();
  //});


};

