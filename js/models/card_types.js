define(function () {

  var types = {
    Land: {
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
