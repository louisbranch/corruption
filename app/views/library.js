define(['jquery', 'backbone', 'text!templates/library.mustache'],
  function ($, Backbone, template) {

    var View = Backbone.View.extend({

      className: 'library',

      initialize: function () {
        this.collection.on('change', this.render, this);
      },

      render: function () {
        this.$el.html(template);
        return this;
      }

    });

    return View;

  }
);
