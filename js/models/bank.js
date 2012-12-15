define(['backbone', 'config'], function (Backbone, Config) {

  var Bank = Backbone.Model.extend({

    initialize: function (player) {
      this.player = player;
      this.set('funds', Config.startingFunds);
    },

    payCost: function (amount) {
      if ( this.get('funds') - amount <= 0 ) {
        return false;
      } else {
        this.removeFunds(amount);
        return true;
      }
    },

    addFunds: function (amount) {
      var funds = this.get('funds')
      this.set('funds', funds + amount);
      return this.get('funds');
    },

    removeFunds: function (amount) {
      var funds = this.get('funds');
      this.set('funds', funds - amount);
      if (this.get('funds') <= 0) {
        throw 'DEAD!'
      }
      return this.get('funds');
    }

  })

  return Bank;

});
