define(['backbone'], function (Backbone) {

  var Battlefield = Backbone.Model.extend({

    initialize: function () {
      this.cards = {
        player1: [],
        player2: []
      };

      this.effects = {
        player1: [],
        player2: [],
        global: []
      }
    }

  });

  return Battlefield;

});
