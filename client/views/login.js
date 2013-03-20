define(['jquery', 'backbone', 'sockets', 'text!templates/login.mustache'],
function ($, Backbone, sockets, template) {

  var View = Backbone.View.extend({

    events: {
      'click button' : 'join'
    },

    render: function () {
      this.$el.html(template);
      $('body').append(this.$el);
      return this;
    },

    join: function () {
      sockets.emit('game:join', {room: 'game1'});
      this.remove();
    }

  });

  return View;

});
