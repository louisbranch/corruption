define(['jquery', 'backbone', 'mustache', 'text!templates/display.mustache'], function ($, Backbone, Mustache, Template) {
  var Display = Backbone.View.extend({
    className: 'display',

    initialize: function (options) {
      this.hand = options.hand;
      this.library = options.library;
      this.hand.bind('add', this.render, this);
      this.hand.bind('remove', this.render, this);
    },

    render: function () {
      var template = Mustache.render(Template, {
        library: this.library.length,
        hand: this.hand.length}
      );
      $(this.el).html(template);
      return this;
    },

  });

  return Display;

});
