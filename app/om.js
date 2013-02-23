define(['underscore', 'backbone'], function (_, Backbone) {

  var om = {
    players: {}
  };

  _.extend(om, Backbone.Events);

  om.bind('register', function (players) {
    _.each(players, function (player) {
      var id = player.get('id');
      om.players[id] = player;
    })
  });

  var intonate = function () {
    var args = _.toArray(arguments);
    om.trigger.apply(om, args);
  };

  return intonate;

});
