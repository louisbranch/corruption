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

    setDeck: function (deferred, cards) {
      this.library.reset(cards);
    },

    drawHand: function (deferred) {
      this.library.draw(config.initialHandCards, this.hand);
    },

    render: function (deferred) {
      this.view.render();
    },

    castCard: function (deferred) {
      deferred.resolve();
      //deferred.reject('ERROR');
    }

  });

  return Player;

});
