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

require(['app/models/game.js', 'om', 'fake_deck'],
  function (Game, om, FakeDeck) {

  var luiz = {id: 1, name: 'luiz', current: true};
  var larissa = {id: 2, name: 'larissa'};

  var fake = FakeDeck();

  var game = new Game()
  game.setPlayers([luiz, larissa]);

  var p1 = game.players[0];
  var p2 = game.players[1];

  om(p1, 'setDeck', fake);
  om(p2, 'setDeck', fake);

  om(p1, 'drawHand');
  om(p2, 'drawHand');

  om(p1, 'render');
  om(p2, 'render');

});
