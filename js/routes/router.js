define(['backbone'], function (Backbone) {

  var Router = Backbone.Router.extend({

    init: function () {
      Backbone.history.start({pushState: true});
    },

    home: function () {
      console.log('first');
    },

    routes: {
      '' : 'home'
    }
  })

  return Router;

});
