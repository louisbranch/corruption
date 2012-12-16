define(['backbone', 'models/bank', 'models/cards', 'config'], function (Backbone, Bank, Cards, Config) {

  var Croupier = Backbone.Model.extend({

    initialize: function (player) {
      this.player = player;
      this.bank = new Bank(this);
    },

    setDeck: function (cards) {
      this.library = new Cards.Library(cards, this);
      this.hand = new Cards.Hand([],this);
      this.table = new Cards.Table([],this);
      this.graveyard = new Cards.Graveyard([],this);
    },

    newTurn: function () {
      this.table.untapAll();
      this.drawCard();
    },

    drawInitialHand: function () {
      this.library.draw(Config.initialHandCards, this.hand);
    },

    drawCard: function (n) {
      var n = n || 1;
      this.library.draw(n, this.hand);
    },

    castCard: function (card) {
      if ( !this.hand.include(card) ) {
        throw 'Card must be in your hand';
      }
      if ( !this.bank.payCost(card.get('cost')) ) {
        throw 'Not enough funds';
      }
      this.hand.remove(card);
      this.table.add(card);
    },

    startAttachPhase: function () {
      console.log('attacking');
    },

    endTurn: function () {
      if (this.player.game.isPlayerTurn(this.player)) {
        this.table.endTurn();
        this.player.game.nextTurn();
      } else {
        throw 'It is not your turn';
      }
    }

  })

  return Croupier;

});
