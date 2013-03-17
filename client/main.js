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
  preserveLicenseComments: false
});

require(['models/game.js', 'lodash', 'om', 'fake_deck', 'sockets'],
  function (Game, _, om, FakeDeck, sockets) {

  var game = new Game()

  sockets.on('setPlayers', game.setPlayers);

});
