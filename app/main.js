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

require(['app/models/game.js', 'views/game', 'models/player', 'om'],
  function (Game, GameView, Player, om) {

  var luiz = {id: 1, name: 'luiz'};
  var larissa = {id: 2, name: 'larissa'};

  var game = new Game();
  var gameView = new GameView({model: game});

  om.trigger('game:setPlayers', [luiz, larissa]);
  om.trigger('player:render');

});
