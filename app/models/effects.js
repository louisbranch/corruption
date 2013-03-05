define(['underscore'], function (_) {

  var Effects = {

    addFunds: function (options) {
      var amount = options.amount;
      this.player.bank.addFunds(amount);
    },

    drawCard: function (options) {
      var amount = options.amount;
      this.player.drawCard(amount);
    },

    damageEnemy: function (options) {
      var amount = options.amount;
      if (_.isFunction(options.amount)) {
        amount = options.amount.apply(this);
      }
      this.player.damageEnemy(amount);
    },

    destroy: function () {
      this.trigger('destroy');
    },

    summonSickness: function () {
      var states = this.get('states')
      states.push('sick');
      this.set('states', states);
    },

    removeSickness: function () {
      var states = this.get('states')
      var i = states.indexOf('sick');
      states.splice(i,1);
      this.set('states', states);
    }

  };

  return Effects;
});
