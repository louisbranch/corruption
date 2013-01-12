define(['jquery', 'underscore', 'backbone', 'mustache', 'text!templates/turn_manager.mustache'],
function ($, _, Backbone, Mustache, Template) {

  var View = Backbone.View.extend({

    events: {
      'click .attack-phase' : 'attackPhase',
      'click .end-turn' : 'endTurn'
    },

    render: function () {
      var template = Mustache.render(Template);
      this.$el.html(template);
      return this;
    },

    attackPhase: function () {
      this.model.attack();
    },

    endTurn: function () {
      this.model.endTurn();
    }

  });

  return View;
});
