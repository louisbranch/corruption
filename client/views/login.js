define(['jquery', 'backbone', 'sockets', 'text!templates/login.mustache'],
function ($, Backbone, sockets, template) {

  var View = Backbone.View.extend({

    events: {
      'click .login-player1' : 'loginPlayer1',
      'click .login-player2' : 'loginPlayer2'
    },

    render: function () {
      this.$el.html(template);
      $('body').append(this.$el);
      return this;
    },

    loginPlayer1: function () {
      sockets.emit('login', 'p1');
      this.remove();
    },

    loginPlayer2: function () {
      sockets.emit('login', 'p2');
      this.remove();
    }

  });

  return View;

});
