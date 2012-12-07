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

require(['js/models/game.js', 'views/game', 'models/player', 'models/cards'], function (Game, GameView, Player, Cards) {

  var luiz = new Player('luiz');
  var larissa = new Player('larissa');

  var game = new Game(luiz, larissa)
  window.Game = game;

  var i = 0
  var cards = [];
  while (i < 15) {
    cards.push(new Cards.Card({type: 'Thief'}));
    i += 1;
  }

  luiz.croupier.setDeck(cards);
  luiz.croupier.drawInitialHand();
  larissa.croupier.setDeck(cards);
  larissa.croupier.drawInitialHand();

  var gameView = new GameView({model: game});
  gameView.render();

  game.start();

});
