define(['underscore', 'backbone', 'models/bank', 'models/cards', 'config'], function (_, Backbone, Bank, Cards, Config) {

  var Croupier = Backbone.Model.extend({

    initialize: function () {
      this.attackQueue = [];
    },

    attack: function () {
      this.verify({turn: true, phase: 'combat'});
      if (!this.attackQueue.length) { throw 'No cards selected to attack' }
      _.forEach(this.attackQueue, function (card) {
        card.onAttack();
      });
      this.attackQueue = [];
      this.set('phase', PHASES[3]);
    },

    addToAttackQueue: function (card) {
      this.verify({turn: true, phase: 'combat'});
      var index = this.attackQueue.indexOf(card);
      if (index !== -1) { return; }
      this.attackQueue.push(card);
      this.trigger('change');
      return true;
    },

    removeFromAttackQueue: function (card) {
      var index = this.attackQueue.indexOf(card);
      if (index === -1) { return; }
      this.attackQueue.splice(index, 1);
      this.trigger('change');
      return true;
    },

    verify: function (conditions) {

      if (conditions.turn) {
        if (this.isMyTurn() !== conditions.turn) {
          throw new Error('Invalid turn action');
        }
      }

      if (conditions.phase) {
        if (!this.isPhase(conditions.phase)) {
          throw new Error('Invalid phase action');
        }
      }
    }

  });

  return Croupier;

});
