requirejs.config({
  baseUrl: 'js',
  paths: {
    'jquery': 'lib/jquery-1.8.2',
    'underscore': 'lib/underscore',
    'backbone': 'lib/backbone'
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

require(['js/models/game.js', 'models/player', 'models/cards'], function (Game, Player, Cards) {

  var luiz = new Player('luiz');
  var larissa = new Player('larissa');

  var game = new Game(luiz, larissa)
  window.Game = game;

  var i = 0
  var cards = [];
  while (i < 5) {
    cards.push(new Cards.Card({type: 'Thief'}));
    i += 1;
  }

  luiz.croupier.setDeck(cards);

  game.start();

});
