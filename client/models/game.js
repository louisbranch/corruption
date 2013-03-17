define(['backbone', 'lodash', 'models/player'],
function (Backbone, _, Player) {

  var Game = Backbone.Model.extend({

    turn: {
      counter: 0,
      player: null
    },

    setPlayers: function (players) {
      _.each(players, function (value, key) {
        this[key] = new Player(value);
        this[key].game = this;
      }, this);
    },

    getEnemy: function (player) {
      if (player === this.p1) {
        return this.p2;
      } else {
        return this.p1;
      }
    },

    isPlayerTurn: function (player) {
      return player === this.turn.player;
    },

    newTurn: function (playerNum) {
      this.turn.counter += 1;
      var newPlayer = this[playerNum];
      this.turn.player = newPlayer;
      newPlayer.newTurn();
    }

  });

  return Game;

});
