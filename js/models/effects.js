define(['underscore'], function (_) {

  var getCroupier = function (card) {
    return card.collection.croupier;
  };

  var getEnemy = function (card) {
    return getCroupier(card).player.getEnemy();
  };

  var Effects = {

    addFunds: function (card, options) {
      var amount = options.amount;
      return function () {
        card.collection.croupier.bank.addFunds(amount);
      };
    },

    drawCard: function (card, options) {
      var amount = options.amount;
      return function () {
        getCroupier(card).drawCard(amount);
      };
    },

    damageEnemy: function (card, options) {
      var amount = options.amount;
      if (_.isFunction(options.amount)) {
        amount = options.amount.apply(card);
      }
      return function () {
        var enemy = getEnemy(card);
        enemy.croupier.bank.removeFunds(amount);
      };
    },

    destroy: function (card) {
      return function () {
        card.destroy();
      };
    },

    summonSickness: function (card) {
      // Add Sickness
      var states = card.get('states')
      states.push('sick');
      card.set('states', states);

      // Remove Sickness
      return function () {
        var i = states.indexOf('sick');
        states.splice(i,1);
        card.set('states', states);
      }
    }

  }

  return Effects;
});
