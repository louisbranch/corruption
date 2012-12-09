define([], function () {

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
      return function () {
        var enemy = getEnemy(card);
        enemy.croupier.bank.removeFunds(amount);
      };
    },

    destroy: function (card) {
      return function () {
        card.destroy();
      };
    }

  }

  return Effects;
});
