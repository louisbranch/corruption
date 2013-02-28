define(['jquery', 'underscore', 'backbone', 'om', 'mustache', 'text!templates/turn_manager.mustache'],
function ($, _, Backbone, om, Mustache, template) {

  var View = Backbone.View.extend({

    className: 'turn-manager',

    initialize: function () {
      this.model.bind('change', this.render, this);
      this.player = this.model.player;
    },

    events: {
      'click .next-phase' : 'nextPhase',
      'click .end-turn' : 'endTurn',
      'click .combat-phase' : 'attack'
    },

    render: function () {
      var html = Mustache.render(template, this.attr());
      this.$el.html(html);
      return this;
    },

    nextPhase: function () {
      this.model.nextPhase();
    },

    endTurn: function () {
      this.model.endTurn();
    },

    attack: function () {
      this.model.attack();
    },

    attr: function () {
      var phase = this.model.get('phase');
      return {
        phase: phase,
        nextPhase: phase === 'main-1' || phase === 'combat',
        //combatPhase: this.model.attackQueue.length,
        endTurn: phase === 'main-2'
      }
    }

  });

  return View;
});
