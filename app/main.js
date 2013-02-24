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

  var luiz = {id: 1, name: 'luiz'};
  var larissa = {id: 2, name: 'larissa'};

  var fake = FakeDeck();

  new Game();

  om.trigger('game:setPlayers', [luiz, larissa]);
  om.trigger('players:render');

  om.player(1, 'setDeck', fake);
  om.player(2, 'setDeck', fake);

});
