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
    Land: Land,
    Sorcery: Sorcery
  };

  var CardType = function (type) {
    return types[type];
  };

  return CardType;

});
