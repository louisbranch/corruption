define(['jquery', 'backbone', 'mustache', 'text!templates/library.mustache'],
  function ($, Backbone, Mustache, Template) {

    var View = Backbone.View.extend({

      className: 'library',

      initialize: function () {
        this.collection.bind('change', this.reRender, this);
      },

      events: {
        'click' : 'drawCard'
      },

      render: function () {
        $(this.el).html(Template);
        return this;
      },

      reRender: function () {
        $(this.el).replaceWith(this.render().el);
      },

      drawCard: function () {
        this.collection.croupier.drawCard();
      }

    });

    return View;

  }
);
