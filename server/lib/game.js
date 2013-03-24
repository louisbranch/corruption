var MAXPLAYERS = 2;

function Game (room) {
  this.room = room;
  this.players = [];
};

exports.Game = Game;

var fn = Game.prototype;

fn.add = function (socket, player) {
  if (this.players.length < MAXPLAYERS) {
    this.players.push({ socket: socket })
    this.room.broadcast('game:joined', {player: player})
  }
};

