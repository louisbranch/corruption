define(['jquery', 'backbone', 'om', 'text!templates/battlefield.mustache'],
  function ($, Backbone, om, template) {

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
