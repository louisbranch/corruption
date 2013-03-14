define(['underscore', 'backbone', 'om', 'models/card_types', 'models/effects'],
function (_, Backbone, om, CardTypes, Effects) {

  var Card = Backbone.Model.extend({

    initialize: function () {
      this.type = CardTypes(this.get('type'));
      this.player = this.collection.player;
      this.set('effects', this.get('effects').concat(this.type.effects), {silent: true});
    },

    defaults: function () {
      return {
        states: []
      };
    },

    tap: function () {
      this.trigger('tap');
    },

    untap: function () {
      this.trigger('untap');
    },

    cast: function () {
      var promise = om(this.player, 'castCard', this);
      promise.done(this.onCast, this.afterCast);
    },

    bury: function () {
      this.player.buryCard(this);
    },

    addToAttackQueue: function () {
      var promise = om(this.player, 'addToAttackQueue', this);
      promise.done(this.tap);
    },

    onCast: function () {
      this.fireEffects('onCast');
    },

    afterCast: function () {
      this.fireEffects('afterCast');
    },

    onAttack: function () {
      this.fireEffects('onAttack');
    },

    eachTurn: function () {
      this.fireEffects('eachTurn');
    },

    endTurn: function () {
      this.fireEffects('endTurn');
    },

    fireEffects: function (trigger) {
      _.each(this.get('effects'), function (effect) {
        if (effect.trigger === trigger) {
          Effects[effect.type].call(this, effect);
        }
      }, this);
    },

    isSick: function () {
      return _.contains(this.get('states'), 'sick');
    }

  });

  var Cards = Backbone.Collection.extend({
    model: Card,

    initialize: function (player) {
      this.player = player;
    }

  });

  var Library = Cards.extend({

    draw: function (n, hand) {
      var n = n || 1;

      if (this.length < n) {
        throw 'Not enough cards!'
      }

      while (n != 0) {
        hand.add(this.shift());
        n -= 1;
      }
    }

  });

  var Hand = Cards.extend();

  var Table = Cards.extend({

    untapAll: function () {
      _.each(this.models, function (card) {
        card.untap();
      });
    },

    endTurn: function () {
      _.each(this.models, function (card) {
        card.endTurn();
      });
    }

  });

  var Graveyard = Cards.extend();

  return {

    Card: Card,
    Library: Library,
    Hand: Hand,
    Table: Table,
    Graveyard: Graveyard

  };

});
