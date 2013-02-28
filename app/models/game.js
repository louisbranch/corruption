define(['backbone', 'underscore', 'models/player'],
function (Backbone, _, Player) {

  var Game = Backbone.Model.extend({

    setPlayers: function (users) {
      var players = _.map(users, function (user) {
        return new Player(user);
      });
      this.players = players;
      players[0].enemy = players[1];
      players[1].enemy = players[0];
    }

  });

  return Game;

});
