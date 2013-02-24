define(['jquery', 'backbone', 'om', 'text!templates/player.mustache', 'views/stats', 'views/library', 'views/hand', 'views/table', 'views/graveyard', 'views/display'],
function ($, Backbone, om, template, Stats, Library, Hand, Table, Graveyard, Display) {

  var Player = Backbone.View.extend({

    className: 'player',

    initialize: function () {
      om.on('players:render', this.render, this);
      this.children = {};
    },

    render: function () {
      this.$el.html(template);
      this.renderChildren();
      $('body').append(this.$el);
      return this;
    },

    renderChildren: function () {
      this.renderStats();
      this.renderLibrary();
      this.renderHand();
      this.renderTable();
      this.renderGraveyard();
      this.renderDisplay();
      _.each(this.children, function (view, key) {
        var $el = this.$el.find('#' + key);
        $el.replaceWith(view.render().el)
      }, this);
    },

    renderStats: function () {
      var view = new Stats({
        player: this.model,
        bank: this.model.bank
      });
      this.children['stats'] = view;
    },

    renderLibrary: function () {
      var view = new Library({collection: this.model.library});
      this.children['library'] = view;
    },

    renderHand: function () {
      var view = new Hand({collection: this.model.hand});
      this.children['hand'] = view;
    },

    renderTable: function () {
      var view = new Table({collection: this.model.table});
      this.children['table'] = view;
    },

    renderGraveyard: function () {
      var view = new Graveyard({collection: this.model.graveyard});
      this.children['graveyard'] = view;
    },

    renderDisplay: function () {
      var view = new Display({
        library: this.model.library,
        hand: this.model.hand
      });
      this.children['display'] = view;
    },

  });

  return Player;

});
