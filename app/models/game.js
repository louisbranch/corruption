define(['backbone', 'underscore', 'om', 'models/player'],
function (Backbone, _, om, Player) {

  var Game = Backbone.Model.extend({

    initialize: function () {
      om.once('game:setPlayers', this.setPlayers, this);
    },

    setPlayers: function (users) {
      var players = _.map(users, function (user) {
        return new Player(user);
      });
      om.trigger('players:register', players);
      return players;
    }

  });

  return Game;

});
