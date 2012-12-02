define(['jquery', 'backbone', 'views/battlefield'], function ($, Backbone, BattlefieldView) {

  var View = Backbone.View.extend({

    render: function () {
      var battlefield = this.model.battlefield;
      var battlefieldView = new BattlefieldView({model: battlefield});
      $('body').append(battlefieldView.render().el);
    }

  });

  return View;

});
