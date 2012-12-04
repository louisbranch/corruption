define(['jquery', 'backbone', 'underscore', 'mustache', 'text!templates/hand.mustache'],
  function ($, Backbone, _, Mustache, Template) {

    var View = Backbone.View.extend({
      tagName: 'li',

      render: function () {
        $(this.el).html(Mustache.render(Template, this.model.toJSON()));
        return this;
      }

    });

    var Collection = Backbone.View.extend({
      tagName: 'ul',
      className: 'hand',

      render: function () {
        var list = document.createDocumentFragment();
        _.each(this.collection.models, function (hand){
          var view = new View({model: hand});
          list.appendChild(view.render().el);
        });
        $(this.el).append(list);
        return this;
      }

    });

    return Collection;

  }
);

