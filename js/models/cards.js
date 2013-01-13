define(['backbone', 'models/card_types', 'models/effects'], function (Backbone, CardTypes, Effects) {

  var Card = Backbone.Model.extend({

    initialize: function (options) {
      this.set('states', []);
      this.type = CardTypes(options.type);
      var effects = options.effects.concat(this.type.effects);
      this.setEffects(effects);
    },

    setEffects: function (effects) {
      var card = this;
      var triggers = {
        onCast: [],
        onAttack: [],
        afterCast: [],
        afterAttack: [],
        eachTurn: [],
        endTurn: []
      };

      effects.forEach(function (effect) {
        var e = Effects[effect.type](card, effect);
        triggers[effect.trigger].push(e);
      });

      for (var i in triggers) {
        if (triggers.hasOwnProperty(i)) {
          this.set(i, triggers[i]);
        }
      }
    },

    tap: function () {
      this.trigger('tap');
    },

    untap: function () {
      this.trigger('untap');
    },

    cast: function () {
      this.collection.croupier.castCard(this);
      this.onCast();
      this.afterCast();
    },

    attack: function () {
      if (this.get('attack') === undefined) { throw 'This card cant attack'; }
      if (this.isSick()) { throw 'A card cant attack in the 1st turn'}
      if (this.collection.croupier.addToAttackQueue(this)) {
        this.tap();
        return true;
      }
    },

    onCast: function () {
      this.get('onCast').forEach(function (effect) {
        effect();
      });
    },

    afterCast: function () {
      this.get('afterCast').forEach(function (effect) {
        effect();
      });
    },

    onAttack: function () {
      this.get('onAttack').forEach(function (effect) {
        effect();
      });
    },

    eachTurn: function () {
      this.get('eachTurn').forEach(function (effect) {
        effect();
      });
    },

    endTurn: function () {
      this.get('endTurn').forEach(function (effect) {
        effect();
      });
    },

    isSick: function () {
      return this.get('states').indexOf('sick') !== -1;
    }

  });

  var Cards = Backbone.Collection.extend({
    model: Card,

    initialize: function (cards, croupier) {
      this.add(cards);
      this.croupier = croupier;
    }

  })

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

  var Hand = Cards.extend({});

  var Table = Cards.extend({

    untapAll: function () {
      this.models.forEach(function (card) {
        card.untap();
      });
    },

    endTurn: function () {
      this.models.forEach(function (card) {
        card.endTurn();
      });
    },

    attack: function () {
      this.croupier.attack();
    }

  });
  var Graveyard = Cards.extend({});

  return {

    Card: Card,
    Library: Library,
    Hand: Hand,
    Table: Table,
    Graveyard: Graveyard

  };

});
