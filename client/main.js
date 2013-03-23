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

require(['lodash', 'backbone', 'sockets', 'hub', 'views/login'],
function(_, Backbone, sockets, Hub, LoginView) {

  var reactor = _.extend({}, Backbone.Events);
  var hub = new Hub(reactor, sockets);

  var login = new LoginView({hub: hub});

});
