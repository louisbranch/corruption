define(['jquery', 'backbone', 'lodash', 'mustache', 'text!templates/table.mustache', 'text!templates/hand.mustache'],
function ($, Backbone, _, Mustache, tableTemplate, handTemplate) {

  var Card = Backbone.View.extend({
    tagName: 'li',

    className: 'card',

    initialize: function () {
      this.model.on('tap', this.tap, this);
      this.model.on('untap', this.untap, this);
    },

    events: {
      'click' : 'attack'
    },

    render: function () {
      var html = Mustache.render(handTemplate, this.model.toJSON());
      this.$el.html(html);
      return this;
    },

    attack: function () {
      this.model.addToAttackQueue();
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
      this.collection.on('add', this.add, this);
    },

    render: function () {
      var html = Mustache.render(tableTemplate);
      this.$el.html(html);
      return this;
    },

    add: function (card) {
      var view = new Card({model: card});
      $list = this.findCardList(card);
      $list.append(view.render().el);
    },

    findCardList: function (card) {
      var name = card.type.name;
      return this.$el.find('ul.table-' + name);
    }

  });

  return Collection;

});
