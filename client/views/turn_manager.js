define(['jquery', 'lodash', 'backbone', 'om', 'mustache', 'text!templates/turn_manager.mustache'],
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
      om(this.player, 'nextPhase');
    },

    endTurn: function () {
      om(this.player, 'endTurn');
    },

    attack: function () {
      om(this.player, 'startCombat');
    },

    attr: function () {
      var phase = this.model.get('phase');
      var attrs = {phase: phase};

      if (this.model.player.get('current')) {
        attrs.nextPhase = phase === 'main-1' || phase === 'combat';
        attrs.combatPhase = this.model.player.attackQueue.hasAttackers();
        attrs.endTurn = phase === 'main-2';
      }

      return attrs;
    }

  });

  return View;
});
