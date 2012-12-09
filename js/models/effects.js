define([], function () {

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
        card.collection.croupier.drawCard(amount);
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
