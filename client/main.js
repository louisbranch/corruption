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
  preserveLicenseComments: false,
  optimize: 'none',
  uglify: {
    beautify: true
  }
});

require(['models/game.js', 'lodash', 'om', 'sockets', 'fake_deck'],
  function (Game, _, om, sockets, FakeDeck) {

  var game = new Game()
  window.game = game;

  sockets.on('game:setPlayers', game.setPlayers.bind(game));

  sockets.on('players:drawHand', function () {
    _.each(['p1', 'p2'], function (pid) {
      game[pid].drawHand();
    })
  });

  sockets.on('player:setDeck', function (pid) {
    game[pid].setDeck(new FakeDeck());
  });

  sockets.on('players:render', function () {
    _.each(['p1', 'p2'], function (pid) {
      game[pid].render();
    })
  });

  sockets.emit('game:join');
  sockets.emit('game:start');

});
