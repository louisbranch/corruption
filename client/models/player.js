define(['lodash', 'backbone'],
function (_, Backbone) {

  var Player = Backbone.Model.extend({

    initialize: function () { },
    isMyTurn: function () { }

  });

  function register (hub) {
  };

  var module = {
    register: register,
    Player: Player
  };

});
