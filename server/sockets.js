var io = require('socket.io');
var _ = require('lodash');

exports.listen = function (server) {
  var sockets = io.listen(server).sockets;

  var players = [
    {id: 1, name: 'luiz'},
    {id: 2, name: 'larissa'}
  ];
  var p1 = {};
  var p2 = {};

  sockets.on('connection', function (socket) {

    socket.on('game:join', function () {
      if (!p1.socket) {
        socket.set('pid', 'p1');
        p1.socket = socket;
      } else if (!p2.socket) {
        p2.socket = socket;
        socket.set('pid', 'p2');
      }
    });

    socket.on('game:start', function (data) {
      if (p1.socket && p2.socket) {
        p1.socket.emit('game:setPlayers', { p1: _.extend({current: true}, players[0]), p2: players[1] });
        p2.socket.emit('game:setPlayers', { p1: players[0], p2: _.extend({current: true}, players[1]) });

        p1.socket.emit('player:setDeck', 'p1');
        p1.socket.emit('player:setDeck', 'p2');
        p2.socket.emit('player:setDeck', 'p1');
        p2.socket.emit('player:setDeck', 'p2');

        p1.socket.emit('players:render');
        p2.socket.emit('players:render');

        p1.socket.emit('players:drawHand');
        p2.socket.emit('players:drawHand');

        p1.socket.emit('game:newTurn', 'p1');
        p2.socket.emit('game:newTurn', 'p1');

      }
    });

    // TODO
    socket.on('castCard', function (data) {});
    socket.on('nextPhase', function (data) {});
    socket.on('endTurn', function (data) {});
    socket.on('startCombat', function (data) {});
    socket.on('addToAttackQueue', function (data) {});

  });

};

