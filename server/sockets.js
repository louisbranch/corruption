var io = require('socket.io');
var _ = require('lodash');

var broadcast = function (event, args) {
};

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;

  var players = [
    {id: 1, name: 'luiz'},
    {id: 2, name: 'larissa'}
  ];
  var p1 = {};
  var p2 = {};

  var broadcast = function (event, args) {
    p1.socket.emit(event, args);
    p2.socket.emit(event, args);
  };

  sockets.on('connection', function (socket) {

    socket.on('login', function (player) {
      if (player === 'p1') {
        p1.socket = socket;
      } else if (player === 'p2') {
        p2.socket = socket;
      }

      if (p1.socket && p2.socket) {
        p1.socket.emit('game:setPlayers', { p1: _.extend({current: true}, players[0]), p2: players[1] });
        p2.socket.emit('game:setPlayers', { p1: players[0], p2: _.extend({current: true}, players[1]) });

        broadcast('player:setDeck', 'p1');
        broadcast('player:setDeck', 'p2');
        broadcast('players:render');
        broadcast('players:drawHand');
        broadcast('game:newTurn', 'p1');
      }
    });

    // TODO
    socket.on('nextPhase', function (data) {});
    socket.on('endTurn', function (data) {});
    socket.on('startCombat', function (data) {});
    socket.on('addToAttackQueue', function (data) {});

  });

  sockets.on('castCard', function (socket, data) {
    socket.broadcast.emit('player:castCard', socket.get('pid'));
  });


};

