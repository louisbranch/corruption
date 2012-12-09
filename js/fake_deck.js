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
  }

  var Deck = function () {
    var self = [];
    var i = 0
    while (i < 15) {
      self.push(new Cards.Card(mana));
      i += 1;
    }
    return self;
  };

  return Deck;
});
