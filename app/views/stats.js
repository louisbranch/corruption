define(['jquery', 'underscore', 'backbone', 'om', 'mustache', 'text!templates/stats.mustache'],
function ($, _, Backbone, om, Mustache, template) {

  var View = Backbone.View.extend({

    className: 'stats',

    initialize: function (options) {
      _.extend(this, _.pick(options, 'player', 'bank'));

      this.player.on('change', this.render, this);
      this.bank.on('change', this.render, this);
    },

    render: function () {
      var html = Mustache.render(template, {
        player: this.player.toJSON(),
        bank: this.bank.toJSON()
      });
      this.$el.html(html);
      return this;
    }

  });

  return View;

});
