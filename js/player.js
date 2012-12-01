define(['backbone', 'bank', 'croupier'], function (Backbone, Bank, Croupier) {

  var Player = Backbone.Model.extend({

    initialize: function (name) {
      this.name = name; // Replace with User
      this.bank = new Bank(this);
      this.croupier = new Croupier(this);
    }

  });

  return Player;

});
