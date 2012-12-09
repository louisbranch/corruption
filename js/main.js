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

require(['js/models/game.js', 'views/game', 'models/player', 'models/cards'],
  function (Game, GameView, Player, Cards) {

  var luiz = new Player({name: 'luiz'});
  var larissa = new Player({name: 'larissa'});

  var game = new Game(luiz, larissa)
  window.Game = game;

  var i = 0
  var cards1 = [];
  var cards2 = [];
  while (i < 15) {
    cards1.push(new Cards.Card({type: 'Mana', cost: 100, initialFunds: 200}));
    cards2.push(new Cards.Card({type: 'Mana', cost: 100}));
    i += 1;
  }

  luiz.croupier.setDeck(cards1);
  larissa.croupier.setDeck(cards2);
  luiz.croupier.drawInitialHand();
  larissa.croupier.drawInitialHand();

  var gameView = new GameView({model: game});
  gameView.render();


  game.start();

});
