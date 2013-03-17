define(['jquery', 'backbone', 'mustache', 'text!templates/display.mustache'],
function ($, Backbone, Mustache, template) {
  var Display = Backbone.View.extend({
    className: 'display',

    initialize: function (options) {
      _.extend(this, _.pick(options, 'library', 'hand'));

      this.hand.on('add', this.render, this);
      this.hand.on('remove', this.render, this);
    },

    render: function () {
      var html = Mustache.render(template, {
        library: this.library.length,
        hand: this.hand.length}
      );
      this.$el.html(html);
      return this;
    },

  });

  return Display;

});
