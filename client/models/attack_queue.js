define(['lodash', 'backbone'], function (_, Backbone) {

  var AttackQueue = Backbone.Model.extend({

    defaults: function () {
      return {
        queue: []
      };
    },

    attack: function () {
      var queue = this.get('queue');
      _.each(queue, function (card) {
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
      return true;
    },

    remove: function (card) {
      var queue = this.get('queue');
      var index = queue.indexOf(card);
      if (index === -1) { return; }

      queue.splice(index, 1);
      this.set('queue', queue);
      return true;
    },

    hasAttackers: function () {
      return this.get('queue').length;
    }

  });

  return AttackQueue;

});
