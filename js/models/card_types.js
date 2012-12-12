define(function () {

  var Creature = {
    effects: [
      {
        type: 'summonSickness',
        trigger: 'onCast'
      },
      {
        type: 'summonSickness',
        trigger: 'endTurn'
      }
    ]
  };

  var Enchantment = {
    effects: []
  };

  var Land = {
    effects: []
  };

  var Sorcery = {
    effects: [
      {
        type: 'destroy',
        trigger: 'afterCast'
      }
    ]
  };

  var types = {
    Creature: Creature,
    Enchantment: Enchantment,
    Land: Land,
    Sorcery: Sorcery
  };

  var CardType = function (type) {
    return types[type];
  };

  return CardType;

});
