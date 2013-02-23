define(['backbone', 'models/croupier'], function (Backbone, Croupier) {

  var Player = Backbone.Model.extend({

    setCroupier: function (deck) {
      this.croupier = new Croupier(this);
      this.croupier.setDeck(deck);
    },

    getEnemy: function () {
      return this.game.getEnemy(this);
    }

  });

  return Player;

});
