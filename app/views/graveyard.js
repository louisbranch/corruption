define(['jquery', 'backbone', 'mustache', 'text!templates/hand.mustache', 'text!templates/graveyard.mustache'],
function ($, Backbone, mustache, handTemplate, template) {

  var Card = Backbone.View.extend({

    tagName: 'li',

    className: 'card',

    render: function () {
      var html = mustache.render(handTemplate, this.model.toJSON());
      this.$el.html(html);
      return this;
    }

  });

  var Collection = Backbone.View.extend({

    tagName: 'ul',

    className: 'graveyard',

    initialize: function () {
      this.collection.on('add', this.add, this);
    },

    render: function () {
      var html = mustache.render(template);
      this.$el.html(html);
      return this;
    },

    add: function (card) {
      var view = new Card({model: card});
      this.$el.append(view.render().el);
    }

  });

  return Collection;

});
