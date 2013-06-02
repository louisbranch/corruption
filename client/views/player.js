define(['jquery', 'lodash', 'backbone', 'mustache', 'text!templates/player.mustache'],
function ($, _, Backbone, mustache, template) {

  var View = Backbone.View.extend({

    className: 'player',

    initialize: function (options) {
      _.extend(this, _.pick(options, 'hub'));
    },

    render: function () {
      var html = mustache.render(template, this.model.toJSON());
      this.$el.html(html);
      $('#players').append(this.$el);
      return this;
    },
  });

  function register (hub) {
    hub.sub('player:created', function (player) {
      var view = new module.View({model: player, hub: hub});
      view.render();
    });
  };

  var module = {
    View: View,
    register: register
  };

  return module;

});
