define(['jquery', 'backbone', 'text!templates/croupier.mustache', 'views/library', 'views/hand', 'views/table', 'views/display'],
  function ($, Backbone, Template, Library, Hand, Table, Display) {

    var View = Backbone.View.extend({
      className: 'croupier',

      render: function () {
        $(this.el).html(Template);
        this.renderSubViews();
        return this;
      },

      renderSubViews: function () {
        this.renderDisplay();
        this.renderLibrary();
        this.renderHand();
        this.renderTable();
      },

      renderLibrary: function () {
        var libraryView = new Library({collection: this.model.library});
        $(this.el).find('.library').replaceWith(libraryView.render().el);
      },

      renderHand: function () {
        var handView = new Hand({collection: this.model.hand});
        $(this.el).find('.hand').replaceWith(handView.render().el);
      },

      renderTable: function () {
        var tableView = new Table({collection: this.model.table});
        $(this.el).find('.table').replaceWith(tableView.render().el);
      },

      renderDisplay: function () {
        var displayView = new Display(
          { library: this.model.library,
            hand: this.model.hand }
        );
        $(this.el).find('.display').replaceWith(displayView.render().el);
      }

    });

    return View;

  }
);
