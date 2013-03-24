define(['jquery', 'backbone', 'text!templates/login.mustache'],
function ($, Backbone, template) {

  var View = Backbone.View.extend({

    initialize: function (options) {
      _.extend(this, _.pick(options, 'hub'));
    },

    events: {
      'click button' : 'join'
    },

    render: function () {
      this.$el.html(template);
      $('body').append(this.$el);
      return this;
    },

    join: function () {
      this.hub.pub('socket:join:room', {room: 'game1'});
      this.remove();
    }

  });

  function register (hub) {
    hub.sub('socket:connected', function () {
      var view = new View({hub: hub});
      view.render();
    });
  };

  return { register: register };

});
