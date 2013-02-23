define(['jquery', 'backbone', 'underscore', 'mustache', 'text!templates/table.mustache', 'text!templates/hand.mustache'],
  function ($, Backbone, _, Mustache, TableTemplate, Template) {

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
        this.$el.html(Mustache.render(Template, this.model.toJSON()));
        return this;
      },

      attack: function () {
        this.model.attack();
      },

      tap: function () {
        this.$el.addClass('tap');
      },

      untap: function () {
        this.$el.removeClass('tap');
      }

    });

    var Collection = Backbone.View.extend({
      className: 'table',

      initialize: function () {
        this.collection.bind('add', this.add, this);
      },

      render: function () {
        var template = Mustache.render(TableTemplate);
        this.$el.html(template);
        return this;
      },

      add: function (card) {
        var view = new View({model: card});
        $list = this.findCardList(card);
        $list.append(view.render().el);
      },

      findCardList: function (card) {
        var name = card.type.name;
        return this.$el.find('ul.table-' + name);
      }

    });

    return Collection;

  }
);
