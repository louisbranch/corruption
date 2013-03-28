define(['lodash', 'backbone'],
function (_, Backbone) {

  var Player = Backbone.Model.extend({

    initialize: function (attrs, options) {
      _.extend(this, _.pick(options, 'hub'));
    }

  });

  function register (hub) {
    hub.sub('socket:player:joined', function (data) {
      new module.Player(data, {hub: hub});
    });
  };

  var module = {
    register: register,
    Player: Player
  };

  return module;

});
