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

require(['js/game.js', 'player'], function (Game, Player) {

  var luiz = new Player('luiz');
  var larissa = new Player('larissa');

  var game = new Game(luiz, larissa)
  window.Game = game;
  game.start();

});
