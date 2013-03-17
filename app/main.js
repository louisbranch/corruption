requirejs.config({
  baseUrl: 'app',
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

require(['models/game.js', 'lodash', 'om', 'fake_deck'],
  function (Game, _, om, FakeDeck) {

  var luiz = {id: 1, name: 'luiz', current: true};
  var larissa = {id: 2, name: 'larissa'};


  var game = new Game()
  window.game = game;
  game.setPlayers([luiz, larissa]);

  _.each(game.players, function (player) {
    player.setDeck(new FakeDeck());
    player.drawHand();
    player.render();
  });

  var p1 = game.players[0];
  game.turn.player = p1;
  p1.newTurn();

});
