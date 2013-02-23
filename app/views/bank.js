define(['jquery', 'backbone', 'mustache', 'text!templates/bank.mustache'], function ($, Backbone, Mustache, Template) {

  var Bank = Backbone.View.extend({
    className: 'bank',

    initialize: function () {
      this.model.bind('change', this.render, this);
    },

    render: function () {
      var template = Mustache.render(Template, this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  return Bank;

});
