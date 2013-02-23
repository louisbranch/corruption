define(['backbone', 'views/player', 'models/battlefield', 'models/bank'],
function (Backbone, View, Battlefield, Bank) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      new View({model: this});

      this.battlefield = new Battlefield();
      this.bank = new Bank();
    }

  });

  return Player;

});
