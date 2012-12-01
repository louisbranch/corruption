define(['backbone'], function (Backbone) {

  var Bank = Backbone.Model.extend({

    initialize: function (player) {
      this.player = player;
      this.funds = 1000;
    },

    payCost: function (amount) {
      if ( this.funds - amount <= 0 ) {
        return false;
      } else {
        this.removeFunds(amount);
        return true;
      }
    },

    addFunds: function (amount) {
      return this.funds += amount;
    },

    removeFunds: function (amount) {
      this.funds -= amount;
      if (this.funds <= 0) {
        throw 'DEAD!'
      }
      return this.funds;
    }

  })

  return Bank;

});
