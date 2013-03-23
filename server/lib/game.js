var MAXPLAYERS = 2;

fn.add = function (socket, player) {
  if (this.players.length < MAXPLAYERS) {
    this.players.push({ socket: socket })
    emit('game:joined', {player: player})
  }
};

