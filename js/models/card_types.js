define(function () {

  var types = {
    Mana: {
      effects: []
    },
    Sorcery: {
      effects: [
        {
          type: 'destroy',
          trigger: 'afterCast'
        }
      ]
    }
  };

  var CardType = function (type) {
    return types[type];
  };

  return CardType;

});
