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
    sinon.assert.calledWith(hub.sub, 'socket:connected');
  });

  test('socket connected event render new view', function (){
    expect(2);
    var View = loginView.View = sinon.stub();
    var render = sinon.spy();
    var hub = {sub: function(name, cb){ cb(); }};

    View.returns({render: render});
    loginView.register(hub);

    sinon.assert.calledWithNew(View, {hub: hub});
    sinon.assert.called(render);
  });

  module('login view rendering');

  test('add view to the page', function () {
    expect(2);
    ok(!$('.login').length);
    var view = new loginView.View();
    view.render();
    ok($('.login').length);
  });

  test('join the game', function () {
    expect(1);
    var hub = {sub: sinon.spy(), pub: sinon.spy()};
    var view = new loginView.View({hub: hub});
    view.render();
    $('.login button').click();
    sinon.assert.calledWith(hub.pub, 'socket:join:room', {room: 'game1'});
  });

});
