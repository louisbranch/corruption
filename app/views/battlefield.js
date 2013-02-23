define(['jquery', 'backbone', 'text!templates/battlefield.mustache'],
  function ($, Backbone, template) {

    var View = Backbone.View.extend({
      className: 'battlefield',

      render: function () {
        this.$el.html(template);
        return this;
      }

    });

    return View;

  }
);
