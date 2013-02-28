define(['backbone', 'underscore', 'models/player'],
function (Backbone, _, Player) {

  var Game = Backbone.Model.extend({

    setPlayers: function (users) {
      var players = _.map(users, function (user) {
        player = new Player(user);
        player.game = this;
        return player;
      }, this);
      this.players = players;
    },

    getEnemy: function (player) {
      if (player === this.players[0]) {
        return this.players[1];
      } else {
        return this.players[0];
      }
    },

    isPlayerTurn: function (player) {
      return player === this.get('currentTurn');
    }

  });

  return Game;

});
