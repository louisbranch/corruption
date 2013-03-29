define(['jquery', 'lodash', 'backbone', 'text!templates/player.mustache'],
function ($, _, Backbone, template) {

  var View = Backbone.View.extend({

    className: 'player',

    initialize: function (options) {
      _.extend(this, _.pick(options, 'hub'));
    },

    render: function () {
      this.$el.html(template, this.model.toJSON());
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
