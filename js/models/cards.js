define(['backbone'], function (Backbone) {

  var Card = Backbone.Model.extend({});

  var Cards = Backbone.Collection.extend({
    model: Card
  })

  var Deck = Cards.extend({});
  var Hand = Cards.extend({});
  var Table = Cards.extend({});
  var Cemetery = Cards.extend({});

});
