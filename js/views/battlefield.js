define(['jquery', 'backbone', 'text!templates/battlefield.mustache'], function ($, Backbone, Template) {

  var View = Backbone.View.extend({
    className: 'battlefield',

    render: function () {
      $(this.el).html(Template);
      return this;
    }
  });

  return View;

});
