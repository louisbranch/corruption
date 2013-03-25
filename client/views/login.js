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
      this.hub.pub('socket:join:game', {game: 'game1', player: {id: 1}});
      //this.remove();
    }

  });

  function register (hub) {
    hub.sub('socket:connected', function () {
      var view = new login.View({hub: hub});
      view.render();
    });
  };

  var login = {
    register: register,
    View: View
  };

  return login;

});
