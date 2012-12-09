define([], function () {

  var Effects = {

    addFunds: function (card, options) {
      var amount = options.amount;
      return function () {
        card.collection.croupier.bank.addFunds(amount);
      }
    }


  }

  return Effects;
});
