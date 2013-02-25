define(['underscore', 'backbone', 'models/card_types', 'models/effects'], function (_, Backbone, CardTypes, Effects) {

  var Card = Backbone.Model.extend({

    initialize: function () {
      this.set('states', [], {silent: true});
      this.type = CardTypes(this.get('type'));
      this.setEffects();
    },

    setEffects: function () {
      var effects = this.get('effects').concat(this.type.effects);

      var triggers = {
        onCast: [],
        onAttack: [],
        afterCast: [],
        afterAttack: [],
        eachTurn: [],
        endTurn: []
      };

      _.each(effects, function (effect) {
        var e = Effects[effect.type](this, effect);
        triggers[effect.trigger].push(e);
      }, this);

      _.each(triggers, function (value, key) {
        this.set(key, value);
      }, this);

    },

    tap: function () {
      this.trigger('tap');
    },

    untap: function () {
      this.trigger('untap');
    },

    cast: function () {
      var player = this.collection.player;
      om.player(player, 'castCard', this);
      this.onCast();
      this.afterCast();
    },

    attack: function () {
      if (this.get('attack') === undefined) { throw 'This card cant attack'; }
      if (this.isSick()) { throw 'A card cant attack in the 1st turn'}
      if (this.croupier.addToAttackQueue(this)) {
        this.tap();
        return true;
      }
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

    fireEffects: function (type) {
      _.each(this.get(type), function (effect) {
        effect();
      });
    },

    isSick: function () {
      return this.get('states').indexOf('sick') !== -1;
    }

  });

  var Cards = Backbone.Collection.extend({
    model: Card,

    initialize: function (player) {
      this.player = player;
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
