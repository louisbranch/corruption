define(['jquery', 'backbone', 'om', 'mustache', 'text!templates/player.mustache', 'views/stats'],
function ($, Backbone, om, Mustache, template, Stats) {

  var Player = Backbone.View.extend({

    className: 'player',

    initialize: function () {
      om.on('players:render', this.render, this);
    },

    render: function () {
      var html = Mustache.render(template);
      this.$el.html(html);
      this.renderStats();
      $('body').append(this.$el);
      return this;
    },

    renderStats: function () {
      var view = new Stats({
        player: this.model,
        bank: this.model.bank
      });
      $stats = this.$el.find('#stats');
      $stats.replaceWith(view.render().el);
    }

  });

  return Player;

});
