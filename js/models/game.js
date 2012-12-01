define(['backbone', 'models/battlefield'], function (Backbone, Battlefield) {

  var Game = Backbone.Model.extend({

    initialize: function (player1, player2) {
      this.setPlayers(player1, player2);
      this.battlefield = new Battlefield();
      this.turns = 0;
    },

    setPlayers: function (player1, player2) {
      this.player1 = player1;
      player1.game = this;

      this.player2 = player2;
      player2.game = this;

      this.currentPlayer = null;
    },

    start: function () {
      this.turns = 1;
      this.currentPlayer = this.getRandomPlayer();
      console.log('Game has started!');
    },

    nextTurn: function () {
      this.turns += 1;
      this.currentPlayer = this.getOpponent(this.currentPlayer);
    },

    getRandomPlayer: function () {
      if (Math.random() >= 0.5) {
        return this.player1;
      } else {
        return this.player2;
      }
    },

    getOpponent: function (player) {
      if (player === this.player1) {
        return this.player2;
      } else {
        return this.player1;
      }
    }

  });

  return Game;

});
