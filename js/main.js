requirejs.config({
  baseUrl: 'js',
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

require(['js/models/game.js', 'views/game', 'models/player', 'fake_deck'],
  function (Game, GameView, Player, FakeDeck) {

  var luiz = new Player({name: 'luiz'});
  var larissa = new Player({name: 'larissa'});

  var game = new Game(luiz, larissa)
  window.Game = game;

  luiz.croupier.setDeck(new FakeDeck());
  larissa.croupier.setDeck(new FakeDeck());
  luiz.croupier.drawInitialHand();
  larissa.croupier.drawInitialHand();

  var gameView = new GameView({model: game});
  gameView.render();


  game.start();

});
