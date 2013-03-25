var _ = require('lodash');
var MAXPLAYERS = 2;

var fakePlayers = [{id: 1, name: 'Luiz'}, {id: 2, name: 'Larissa'}];

exports.bind = function (sockets) {
  var games = {};

  var find = function (id) {
    if (games[id]) {
      return games[id];
    }

    var game = new Game(id, sockets);
    games[id] = game;
    return game;
  }
  return find;
}

function Game (id, sockets) {
  this.id = id;
  this.sockets = sockets;
  this.players = [];
};

var fn = Game.prototype;

fn.join = function (socket, data) {
  if (this.players.length === MAXPLAYERS) { return; }
  if (this.hasSocket(socket)) { return; }

  var player = this.addPlayer(socket);
  this.broadcast('socket:game:joined', player);
  socket.emit('socket:setPlayer', {id: player.id});
};

fn.broadcast = function (event, data) {
  var room = this.sockets.in(this.id);
  room.emit(event, data);
};

fn.hasSocket = function (socket) {
  return _.find(this.players, function (p) {
    return p.socket === socket;
  });
};

fn.addPlayer = function (socket) {
  var player = fakePlayers.shift();
  socket.join(this.id);
  this.players.push({ socket: socket, player: player });
  return player;
};
