var MAXPLAYERS = 2;

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
  if (this.players.length >= MAXPLAYERS) { return; }
  socket.join(this.id);
  this.players.push({ socket: socket })
  this.broadcast('socket:game:joined', {player: data.player})
};

fn.broadcast = function (event, data) {
  var room = this.sockets.in(this.id);
  room.emit(event, data);
};
