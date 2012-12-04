define(['backbone'], function (Backbone) {

  var Battlefield = Backbone.Model.extend({

    initialize: function (game) {
      this.game = game;

      this.effects = {
        player1: [],
        player2: [],
        global: []
      }
    }

  });

  return Battlefield;

});
