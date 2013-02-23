define(['backbone', 'models/battlefield', 'views/player'], function (Backbone, Battlefield, playerView) {

  var Player = Backbone.Model.extend({

    initialize: function () {
      this.battlefield = new Battlefield();
      new playerView({model: this});
    }

  });

  return Player;

});
