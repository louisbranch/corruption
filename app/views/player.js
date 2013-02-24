define(['jquery', 'backbone', 'om', 'text!templates/player.mustache', 'views/stats', 'views/library'],
function ($, Backbone, om, template, Stats, Library) {

  var Player = Backbone.View.extend({

    className: 'player',

    initialize: function () {
      om.on('players:render', this.render, this);
    },

    render: function () {
      this.$el.html(template);
      this.renderStats();
      this.renderLibrary();
      $('body').append(this.$el);
      return this;
    },

    renderStats: function () {
      var view = new Stats({
        player: this.model,
        bank: this.model.bank
      });
      $el = this.$el.find('#stats');
      $el.replaceWith(view.render().el);
    },

    renderLibrary: function () {
      var view = new Library({collection: this.model.library});
      $el = this.$el.find('#library');
      $el.replaceWith(view.render().el);
    }

  });

  return Player;

});
