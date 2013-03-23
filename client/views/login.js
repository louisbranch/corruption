define(['jquery', 'backbone', 'sockets', 'text!templates/login.mustache'],
function ($, Backbone, sockets, template) {

  var View = Backbone.View.extend({

    initialize: function (options) {
      _.extend(this, _.pick(options, 'hub'));
      this.hub.sub('socket:connected', this.render.bind(this));
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

  return View;

});
