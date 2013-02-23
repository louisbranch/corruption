define(['jquery', 'backbone', 'mustache', 'text!templates/bank.mustache'],
function ($, Backbone, Mustache, template) {

  var Bank = Backbone.View.extend({
    className: 'bank',

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    render: function () {
      var html = Mustache.render(template, this.model.toJSON());
      this.$el.html(html);
      return this;
    }
  });

  return Bank;

});
