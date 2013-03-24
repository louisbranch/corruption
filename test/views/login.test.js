define(['jquery', 'views/login'], function ($, loginView) {

  module('login view register socket event', {
    setup: function () {
      this.realView = loginView.View;
    },
    teardown: function () {
      loginView.View = this.realView;
    }
  });

  test('register socket connected event', function () {
    expect(1);
    var hub = {sub: sinon.spy()};
    loginView.register(hub);
    ok(hub.sub.calledWith('socket:connected'));
  });

  test('socket connected event render new view', function (){
    expect(2);
    var View = loginView.View = sinon.stub();
    var render = sinon.spy();
    var hub = {sub: function(name, cb){ cb(); }};

    View.returns({render: render});
    loginView.register(hub);

    ok(View.calledWithNew({hub: hub}))
    ok(render.getCall());
  });

  module('login view rendering');

  test('add view to the page', function () {
    expect(2);
    ok(!$('.login').length);
    var view = new loginView.View();
    view.render();
    ok($('.login').length);
  });

});
