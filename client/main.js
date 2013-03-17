requirejs.config({
  baseUrl: 'client',
  paths: {
    'jquery': 'lib/jquery-1.8.2',
    'lodash': 'lib/lodash',
    'backbone': 'lib/backbone',
    'mustache': 'lib/mustache',
    'text': 'lib/text'
  },
  shim: {
    'lodash': {
      exports: '_'
    },
    'backbone': {
      deps: ['lodash', 'jquery'],
      exports: 'Backbone'
    }
  },
  preserveLicenseComments: false
});

require(['models/game.js', 'lodash', 'om', 'fake_deck', 'sockets'],
  function (Game, _, om, FakeDeck, sockets) {

  var game = new Game()

  sockets.on('setPlayers', function (msg) {
    game.setPlayers(msg.players);
  });

  //_.each(game.players, function (player) {
  //  player.setDeck(new FakeDeck());
  //  player.drawHand();
  //  player.render();
  //});

  //var p1 = game.players[0];
  //game.turn.player = p1;
  //p1.newTurn();

});
