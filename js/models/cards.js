define(['backbone'], function (Backbone) {

  var Card = Backbone.Model.extend({

    initialize: function (options) {
      this.setType(options.type);
      this.setAbilities(options.abilities);
      this.setEffects(options.effects);
    },

    setType: function (type) {
      if (!type) { throw 'Invalid Type' }
      this.type = type;
    },

    setAbilities: function (abilities) {
      this.abilities = [];
      if (!abilities) {return;}
      abilities.forEach( function (ability) {
        var newAbility = Abilities.find(ability);
        this.abilities.push(newAbility);
      });
    },

    setEffects: function (effects) {
      this.effects = [];
      if (!effects) {return;}
      effects.forEach( function (effect) {
        var newEffect = Effects.find(effect);
        this.effects.push(newEffect);
      });
    },

    cast: function () {
      this.collection.croupier.castCard(this);
      // Trigger Effects
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
      var n = n || 0;

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
