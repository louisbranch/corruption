define(['jquery', 'backbone', 'om', 'mustache', 'views/battlefield'],
function ($, Backbone, om, Mustache, View) {

  var Player = Backbone.View.extend({

    className: 'player',

    initialize: function () {
      om.on('player:render', this.render, this);
    },

    render: function () {
      this.renderBattlefield();
      return this;
    },

    renderBattlefield: function () {
      var battlefield = this.model.battlefield;
      var view = new View({model: battlefield});
      $('body').append(view.render().el);
    }

  });

  return Player;

});
