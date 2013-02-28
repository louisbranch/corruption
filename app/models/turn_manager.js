define(['underscore', 'backbone'], function (_, Backbone) {

  var PHASES = ['beginning', 'main-1', 'combat', 'main-2', 'ending'];

  var TurnManager = Backbone.Model.extend({

    initialize: function () {
      this.set('phase', null, {silent: true});
    },

    newTurn: function () {
      this.set('phase', PHASES[0]);
      this.player.table.untapAll();
      this.player.drawCard();
      this.set('phase', PHASES[1]);
    },

    nextPhase: function () {
      //this.verify({turn: true, phase: ['main-1', 'combat', 'main-2']});
      var currentPhase = this.get('phase');
      var nextPhase = PHASES[PHASES.indexOf(currentPhase) + 1];
      this.set('phase', nextPhase);
    },

    endTurn: function () {
      //this.verify({turn: true});
      this.set('phase', PHASES[4]);
      this.set('phase', null);
      this.player.table.endTurn();
      this.player.game.newTurn();
    },

    isPhase: function (/*phases*/) {
      var phase = this.get('phase');
      var phases = _.toArray(arguments);
      return _.contains(phases, phase);
    },

    canCast: function () {
      return this.isPhase('main-1', 'main-2');
    },

    canAttack: function () {
      return this.isPhase('main-1', 'combat');
    }

  });

  return TurnManager;

});
