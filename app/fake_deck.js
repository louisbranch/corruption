define(['underscore', 'models/cards'], function (_, Cards) {

  var Maker = function (type, attrs) {
    return _.defaults(attrs || {}, type);
  };

  var land = {
    name: 'ANAC',
    type: 'Land',
    cost: 0,
    effects: [
      {
        type: 'addFunds',
        trigger: 'onCast',
        amount: 100
      }
    ]
  };

  var drawer = {
    name: 'Sessao Extraordinaria',
    type: 'Sorcery',
    cost: 200,
    effects: [
      {
        type: 'drawCard',
        trigger: 'onCast',
        amount: 2
      }
    ]
  };

  var damager = {
    name: 'Escandalo Midiatico',
    type: 'Sorcery',
    cost: 300,
    effects: [
      {
        type: 'damageEnemy',
        trigger: 'onCast',
        amount: 400
      }
    ]
  };

  var creature = {
    name: 'Deputado',
    type: 'Creature',
    cost: 200,
    attack: 100,
    defense: 200,
    effects: []
  };

  var Deck = function () {
    var cards = [];
    _.times(30, function (i) {
      _.each([land, drawer, damager, creature], function (type, j) {
        cards.push(new Maker(type, {id: i + j}));
      });
    });
    return cards;
  };

  return Deck;
});
