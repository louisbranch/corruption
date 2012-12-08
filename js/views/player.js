define(['jquery', 'backbone', 'mustache', 'text!templates/player.mustache', 'views/bank'],
function ($, Backbone, Mustache, Template, Bank) {

  var Player = Backbone.View.extend({

    className: 'player',

    render: function () {
      var template = Mustache.render(Template, this.model.toJSON());
      $(this.el).html(template);
      this.renderBank();
      return this;
    },

    renderBank: function () {
      var bankView = new Bank({model: this.model.bank});
      $(this.el).find('.bank').replaceWith(bankView.render().el);
    }

  });

  return Player;

});
