define(['backbone', 'models/cards'], function (Backbone, Cards) {

  var Croupier = Backbone.Model.extend({

    initialize: function (player) {
      this.player = player;
    },

    setDeck: function (cards) {
      this.library = new Cards.Library(cards, this);
      this.hand = new Cards.Hand([],this);
      this.table = new Cards.Table([],this);
      this.graveyard = new Cards.Graveyard([],this);
    },

    drawInitialHand: function () {
      this.library.draw(5, this.hand);
    },

    drawCard: function (n) {
      var n = n || 1;
      this.library.draw(n, this.hand);
    },

    castCard: function (card) {
      if ( !this.hand.include(card) ) {
        throw 'Card must be in your hand'
      }
      if ( !this.player.bank.payCost(card.cost) ) {
        throw 'Not enough funds'
      }
      this.hand.remove(card);
      this.table.add(card);
    }

  })

  return Croupier;

});