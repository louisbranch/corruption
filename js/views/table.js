define(['jquery', 'backbone', 'underscore', 'mustache', 'text!templates/hand.mustache'],
  function ($, Backbone, _, Mustache, Template) {

    var View = Backbone.View.extend({
      tagName: 'li',

      initialize: function () {
        this.model.bind('destroy', this.remove, this);
        this.model.bind('tap', this.tap, this);
        this.model.bind('untap', this.untap, this);
      },

      events: {
        'click' : 'attack'
      },

      render: function () {
        $(this.el).html(Mustache.render(Template, this.model.toJSON()));
        return this;
      },

      attack: function () {
        this.model.attack();
      },

      tap: function () {
        $(this.el).addClass('tap');
      },

      untap: function () {
        $(this.el).removeClass('tap');
      }

    });

    var Collection = Backbone.View.extend({
      tagName: 'ul',
      className: 'table',

      initialize: function () {
        this.collection.bind('add', this.add, this);
      },

      render: function () {
        var list = document.createDocumentFragment();
        _.each(this.collection.models, function (card){
          var view = new View({model: card});
          list.appendChild(view.render().el);
        });
        $(this.el).append(list);
        return this;
      },

      add: function (card) {
        var view = new View({model: card});
        $(this.el).append(view.render().el);
      }

    });

    return Collection;

  }
);
