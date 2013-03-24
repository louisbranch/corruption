var Game = require('./game').Game;

exports.bind = function (io) {
  var sockets = io.sockets;
  var rooms = {};

  var find = function (name) {
    if (rooms[name]) {
      return rooms[name];
    }

    var room = new Room(name, sockets);
    rooms[name] = room;
    return room;
  }
  return find;
}

function Room (name, sockets) {
  this.name = name;
  this.sockets = sockets;
  this.game = new Game(this);
};

var fn = Room.prototype;

fn.join = function (socket, player) {
  socket.join(this.name);
  this.game.add(socket, player);
};

fn.broadcast = function (event, data) {
  var emit = this.sockets.in(this.name);
  emit(event, data);
};
