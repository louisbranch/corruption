define(['backbone', 'views/player', 'models/battlefield', 'models/bank', 'models/cards'],
function (Backbone, View, Battlefield, Bank, Cards) {

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
      console.log(cards)
      this.library = new Cards.Library(cards);
    }

  });

  return Player;

});
