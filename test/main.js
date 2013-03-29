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
  }
});
QUnit.config.autostart = false;
require([
        '/test/hub.test.js',
        '/test/models/player.test.js',
        '/test/views/login.test.js',
        '/test/views/player.test.js'
], function () {
  QUnit.start();
});
