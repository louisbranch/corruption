define(['jquery', 'backbone', 'text!templates/graveyard.mustache'],
  function ($, Backbone, template) {

    var View = Backbone.View.extend({

      className: 'graveyard',

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

