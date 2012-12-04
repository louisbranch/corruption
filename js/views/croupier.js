define(['jquery', 'backbone', 'text!templates/croupier.mustache', 'views/library', 'views/hand'],
  function ($, Backbone, Template, Library, Hand) {

    var View = Backbone.View.extend({
      className: 'croupier',

      render: function () {
        $(this.el).html(Template);
        this.renderSubViews();
        return this;
      },

      renderSubViews: function () {
        this.renderLibrary();
        this.renderHand();
      },

      renderLibrary: function () {
        var libraryView = new Library({collection: this.model.library});
        $(this.el).find('.library').replaceWith(libraryView.render().el);
      },

      renderHand: function () {
        var handView = new Hand({collection: this.model.hand});
        $(this.el).find('.hand').replaceWith(handView.render().el);
      }

    });

    return View;

  }
);
