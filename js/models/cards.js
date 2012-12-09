define(['backbone', 'models/card_types'], function (Backbone, CardTypes) {

  var Card = Backbone.Model.extend({

    initialize: function (options) {
      this.type = new CardTypes[name](this);
    },

    cast: function () {
      this.collection.croupier.castCard(this);
    },

    // Hook functions
    onCast: function () {},
    eachTurn: function () {}

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
