define(['backbone', 'config', 'views/player', 'models/battlefield', 'models/bank', 'models/cards'],
function (Backbone, config, View, Battlefield, Bank, Cards) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      new View({model: this});

      this.battlefield = new Battlefield();
      this.bank = new Bank();
      this.hand = new Cards.Hand();
      this.table = new Cards.Table();
      this.graveyard = new Cards.Graveyard();
    },

    setDeck: function (cards) {
      this.library = new Cards.Library(cards);
    },

    drawHand: function () {
      this.library.draw(config.initialHandCards, this.hand);
    },

  });

  return Player;

});
