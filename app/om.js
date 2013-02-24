define(['underscore', 'backbone'], function (_, Backbone) {

  var om = {
    players: {}
  };

  _.extend(om, Backbone.Events);

  om.on('players:register', function (players) {
    _.each(players, function (player) {
      var id = player.get('id');
      om.players[id] = player;
    })
    console.log(om.players);
  });

  om.player = function (id, event) {
    var player = this.players[id];
    var args = _.toArray(arguments);
    player[event].apply(player, args.splice(2));
  };

  return om;

});
