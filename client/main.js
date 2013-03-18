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

require(['views/login', 'models/game.js', 'lodash', 'om', 'sockets', 'fake_deck'],
  function (LoginView, Game, _, om, sockets, FakeDeck) {

  var login = new LoginView();
  login.render();

  var game = new Game()

  sockets.on('game:setPlayers', game.setPlayers.bind(game));
  sockets.on('game:newTurn', game.newTurn.bind(game));

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

  sockets.on('player:castCard', function (pid) {
    console.log(pid);
  });

});
