define(['models/cards'], function (Cards) {

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
    var self = [];
    var i = 0
    while (i < 5) {
      self.push(land);
      self.push(drawer);
      self.push(damager);
      self.push(creature);
      i += 1;
    }
    return self;
  };

  return Deck;
});
