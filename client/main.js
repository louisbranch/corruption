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
  optimize: 'none'
});

require(['lodash', 'backbone', 'sockets', 'hub', 'events_register'],
function(_, Backbone, sockets, Hub, eventsRegister) {

  var reactor = _.extend({}, Backbone.Events);
  var hub = new Hub(reactor, sockets);

  eventsRegister.init(hub);
});
