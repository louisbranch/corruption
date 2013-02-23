define(['underscore'], function (_) {

  var getEnemy = function (card) {
    return card.croupier.player.getEnemy();
  };

  var Effects = {

    addFunds: function (card, options) {
      var amount = options.amount;
      return function () {
        card.croupier.bank.addFunds(amount);
      };
    },

    drawCard: function (card, options) {
      var amount = options.amount;
      return function () {
        card.croupier.drawCard(amount);
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
      return function () {
        var states = card.get('states')
        states.push('sick');
        card.set('states', states);
      }
    },

    removeSickness: function (card) {
      return function () {
        var states = card.get('states')
        var i = states.indexOf('sick');
        states.splice(i,1);
        card.set('states', states);
      }
    }

  };

  return Effects;
});
