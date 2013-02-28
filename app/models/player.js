define(['underscore', 'backbone', 'config', 'views/player', 'models/battlefield', 'models/bank', 'models/cards'],
function (_, Backbone, config, View, Battlefield, Bank, Cards) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      this.view = new View({model: this});

      this.battlefield = new Battlefield();
      this.bank = new Bank();
      this.hand = new Cards.Hand();
      this.table = new Cards.Table();
      this.graveyard = new Cards.Graveyard();
      this.library = new Cards.Library();

      _.each(['hand', 'table', 'graveyard', 'library'], function (collection) {
        this[collection].player = this;
      }, this);
    },

    setDeck: function (cards) {
      this.library.reset(cards);
    },

    drawHand: function () {
      this.library.draw(config.initialHandCards, this.hand);
    },

    attack: function () {
      console.log('attack');
    },

    drawCard: function (n) {
      var n = n || 1;
      this.library.draw(n, this.hand);
    },

    render: function () {
      this.view.render();
    },

    castCard: function (deferred, card) {
      //this.verify({turn: true, phase: ['main-1', 'main-2']});

      if (!this.hand.include(card)) {
        return deferred.reject('Card must be in your hand');
      }

      if (!this.bank.payCost(card.get('cost'))) {
        return deferred.reject('Not enough funds');
      }

      this.hand.remove(card);
      this.table.add(card);
      deferred.resolveWith(card);
    },

    attack: function (deferred, card) {
      if (card.get('attack') === undefined) {
        return deferred.reject('This card cant attack');
      }

      if (card.isSick()) {
        return deferred.reject('A card cant attack in the 1st turn');
      }

      if (this.addToAttackQueue(card)) {
        deferred.resolveWith(card);
      }

    },

    damageEnemy: function (amount) {
      console.log('damaing', amount);
    }

  });

  return Player;

});
