define(['jquery', 'backbone', 'text!templates/battlefield.mustache', 'views/croupier'],
  function ($, Backbone, Template, Croupier) {

    var View = Backbone.View.extend({
      className: 'battlefield',

      initialize: function () {
        this.player1 = this.model.game.player1;
        this.player2 = this.model.game.player2;
      },

      render: function () {
        $(this.el).html(Template);
        this.renderCroupiers();
        return this;
      },

      renderCroupiers: function () {
        var visitorView = new Croupier({model: this.player1.croupier});
        var homeView = new Croupier({model: this.player2.croupier});

        $(this.el).find('.visitor-battlefield').html(visitorView.render().el);
        $(this.el).find('.home-battlefield').html(homeView.render().el);
      }

    });

    return View;

  }
);
