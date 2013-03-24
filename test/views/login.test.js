define(['views/login'], function (loginView) {

  module('login view register socket event');

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

});
