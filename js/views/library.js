define(['jquery', 'backbone', 'mustache', 'text!templates/library.mustache'],
  function ($, Backbone, Mustache, Template) {

    var View = Backbone.View.extend({

      className: 'library',

      render: function () {
        $(this.el).html(Template);
        return this;
      }

    });

    return View;

  }
);
