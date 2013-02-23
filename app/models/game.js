define(['backbone', 'underscore', 'om', 'models/player', 'models/battlefield'], function (Backbone, _, om, Player, Battlefield) {

  var Game = Backbone.Model.extend({

    initialize: function (users) {
      var players = _.map(users, function (user) {
        return new Player(user);
      })
      om('register', players);
    }

  });

  return Game;

});
