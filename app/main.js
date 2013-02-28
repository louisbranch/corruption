requirejs.config({
  baseUrl: 'app',
  paths: {
    'jquery': 'lib/jquery-1.8.2',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone',
    'mustache': 'lib/mustache',
    'text': 'lib/text'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['app/models/game.js', 'underscore', 'om', 'fake_deck'],
  function (Game, _, om, FakeDeck) {

  var luiz = {id: 1, name: 'luiz', current: true};
  var larissa = {id: 2, name: 'larissa'};

  var fake = FakeDeck();

  var game = new Game()
  game.setPlayers([luiz, larissa]);

  _.each(game.players, function (player) {
    player.setDeck(fake);
    player.drawHand();
    player.render();
  });

  game.set('currentTurn', game.players[0]);

});
