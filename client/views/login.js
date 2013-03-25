define(['jquery', 'backbone', 'text!templates/login.mustache'],
function ($, Backbone, template) {

  var View = Backbone.View.extend({

    className: 'login',

    initialize: function (options) {
      _.extend(this, _.pick(options, 'hub'));
    },

    events: {
      'click button' : 'join'
    },

    render: function () {
      this.$el.html(template);
      $('#login').replaceWith(this.$el);
      return this;
    },

    join: function () {
      this.hub.pub('socket:game:join', {game: 'game1'});
      this.hub.sub('socket:game:joined', this.remove.bind(this));
    }

  });

  function register (hub) {
    hub.sub('socket:connected', function () {
      var view = new module.View({hub: hub});
      view.render();
    });
  };

  var module = {
    register: register,
    View: View
  };

  return module;

});
