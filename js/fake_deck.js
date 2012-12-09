define(['models/cards'], function (Cards) {

  var land = {
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
    type: 'Sorcery',
    cost: 200,
    effects: [
      {
        type: 'drawCard',
        trigger: 'onCast',
        amount: 1
      }
    ]
  };

  var damager = {
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

  var Deck = function () {
    var self = [];
    var i = 0
    while (i < 5) {
      self.push(new Cards.Card(land));
      self.push(new Cards.Card(drawer));
      self.push(new Cards.Card(damager));
      i += 1;
    }
    return self;
  };

  return Deck;
});
