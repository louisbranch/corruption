define(['backbone', 'models/bank', 'models/croupier'], function (Backbone, Bank, Croupier) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      this.bank = new Bank(this);
      this.croupier = new Croupier(this);
    }

  });

  return Player;

});
