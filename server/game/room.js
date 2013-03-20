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
};

var fn = Room.prototype;

fn.join = function (socket) {
  socket.join(this.name);
  this.addPlayer(socket);
};

fn.broadcast = function (event, data) {
  var emit = this.sockets.in(this.name);
  emit(event, data);
};

fn.addPlayer = function (socket) {
  if (!this.p1) { return this.p1 = socket; }
  if (!this.p2) { return this.p2 = socket; }
};

find = function (name) {
}
