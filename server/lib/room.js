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

var Room = function (name, sockets) {
  this.name = name;
  this.sockets = sockets;
  this.game = new Game();
};

var fn = Room.prototype;

fn.join = function (socket, player) {
  socket.join(this.name);
  this.addPlayer(socket, player);
};

fn.broadcast = function (event, data) {
  var emit = this.sockets.in(this.name);
  emit(event, data);
};
