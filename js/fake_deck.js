define(['models/cards'], function (Cards) {

  var mana = {
    type: 'Mana',
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

  var Deck = function () {
    var self = [];
    var i = 0
    while (i < 15) {
      self.push(new Cards.Card(mana));
      self.push(new Cards.Card(drawer));
      i += 1;
    }
    return self;
  };

  return Deck;
});
