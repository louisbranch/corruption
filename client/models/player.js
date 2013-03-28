define(['lodash', 'backbone'],
function (_, Backbone) {

  var Player = Backbone.Model.extend({

    initialize: function (attrs, options) {
      _.extend(this, _.pick(options, 'hub'));
      this.hub.sub('socket:player:setCurrent', this.setCurrent.bind(this));
    },

    setCurrent: function (data) {
      if (this.get('id') === data.id) {
        this.current = true;
      }
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
