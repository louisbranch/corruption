define(['backbone'], function (Backbone) {

  var Player = Backbone.Model.extend({

    initialize: function (name) {
      this.name = name;
    }

  });

  return Player;

});
