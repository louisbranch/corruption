define(['underscore', 'backbone'], function (_, Backbone) {

  var AttackQueue = Backbone.Model.extend({

    defaults: {
      queue: []
    },

    attack: function () {
      var queue = this.get('queue');
      _.forEach(this.attackQueue, function (card) {
        card.onAttack();
      });
      this.set('queue', []);
    },

    add: function (card) {
      var queue = this.get('queue');
      var index = queue.indexOf(card);
      if (index !== -1) { return; }

      queue.push(card);
      this.set('queue', queue);
    },

    remove: function (card) {
      var queue = this.get('queue');
      var index = queue.indexOf(card);
      if (index === -1) { return; }

      queue.splice(index, 1);
      this.set('queue', queue);
    },

    hasAttackers: function () {
      return this.get('queue').length;
    }

  });

  return AttackQueue;

});
