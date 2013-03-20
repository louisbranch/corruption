var start = function (room) {
};


if (p1.socket && p2.socket) {

if (socket === p1.socket){
  socket.emit('game:setPlayers', { p1: _.extend({current: true}, p1), p2: p2 });
} else if (socket === p2.socket) {
  socket.emit('game:setPlayers', { p1: p1, p2: _.extend({current: true}, p2) });
}

  broadcast(data.room, 'player:setDeck', 'p1');
  broadcast(data.room, 'player:setDeck', 'p2');
  broadcast(data.room, 'players:render');
  broadcast(data.room, 'players:drawHand');
  broadcast(data.room, 'game:newTurn', 'p1');
}

