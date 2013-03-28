define(['jquery', 'views/login'], function ($, unit) {

  module('login view register socket event', {
    setup: function () {
      this.realView = unit.View;
    },
    teardown: function () {
      unit.View = this.realView;
    }
  });

  test('register socket:connected event', function () {
    expect(1);
    var hub = {sub: sinon.spy()};
    unit.register(hub);
    sinon.assert.calledWith(hub.sub, 'socket:connected');
  });

  test('socket:connected event render new view', function (){
    expect(3);
    var View = unit.View = sinon.stub();
    var render = sinon.spy();
    var hub = {sub: function(name, cb){ cb(); }};

    View.returns({render: render});
    unit.register(hub);

    sinon.assert.calledWithNew(View);
    sinon.assert.calledWith(View, {hub: hub});
    sinon.assert.called(render);
  });

  module('login view initialization');

  test('has hub access', function () {
    expect(1);
    var hub = {};
    var view = new unit.View({hub: hub});
    equal(view.hub, hub);
  });

  module('login view rendering');

  test('adds view to the page', function () {
    expect(2);
    ok(!$('.login').length);
    var view = new unit.View();
    view.render();
    ok($('.login').length);
  });

  test('joins the game', function () {
    expect(1);
    var hub = {sub: sinon.spy(), pub: sinon.spy()};
    var view = new unit.View({hub: hub});
    view.render();
    $('.login button').click();
    sinon.assert.calledWith(hub.pub, 'socket:game:join', {game: 'game1'});
  });

});
