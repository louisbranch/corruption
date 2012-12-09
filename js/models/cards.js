define(['backbone', 'models/card_types', 'models/effects'], function (Backbone, CardTypes, Effects) {

  var Card = Backbone.Model.extend({

    initialize: function (options) {
      this.type = CardTypes(options.type);
      var effects = options.effects.concat(this.type.effects);
      this.setEffects(effects);
    },

    setEffects: function (effects) {
      var card = this;
      var triggers = {
        onCast: [],
        afterCast: [],
        eachTurn: []
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

    cast: function () {
      this.collection.croupier.castCard(this);
      this.onCast();
      this.afterCast();
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

    eachTurn: function () {
      this.get('eachTurn').forEach(function (effect) {
        effect();
      });
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
  var Table = Cards.extend({});
  var Graveyard = Cards.extend({});

  return {

    Card: Card,
    Library: Library,
    Hand: Hand,
    Table: Table,
    Graveyard: Graveyard

  };

});
