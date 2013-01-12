define(function () {

  var Creature = {
    name: 'creature',
    effects: [
      {
        type: 'summonSickness',
        trigger: 'onCast'
      },
      {
        type: 'removeSickness',
        trigger: 'endTurn'
      },
      {
        type: 'damageEnemy',
        trigger: 'onAttack',
        amount: function () {return this.get('attack');}
      }
    ]
  };

  var Enchantment = {
    name: 'enchantment',
    effects: []
  };

  var Land = {
    name: 'land',
    effects: []
  };

  var Sorcery = {
    name: 'sorcery',
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
