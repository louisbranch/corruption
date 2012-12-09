define(['backbone', 'models/croupier'], function (Backbone, Croupier) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      this.croupier = new Croupier(this);
    }

  });

  return Player;

});
