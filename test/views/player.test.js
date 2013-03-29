define(['jquery', 'views/player'], function ($, unit) {

  test('register player:created event', function () {
    expect(1);
    var hub = {sub: sinon.spy()};
    unit.register(hub);
    sinon.assert.calledWith(hub.sub, 'player:created');
  });

  test('player:created event render new view', function (){
    expect(2);
    var player = {};
    var hub = {sub: function(name, cb){ cb(player); }};
    var mock = sinon.mock(unit);
    var render = sinon.spy();
    mock.expects('View').withArgs({hub: hub, model: player}).returns({render: render});
    unit.register(hub);
    sinon.assert.called(render);
    mock.verify();
  });

  module('player view initialization');

  test('has hub access', function () {
    expect(1);
    var hub = {};
    var view = new unit.View({hub: hub});
    equal(view.hub, hub);
  });

  module('player view rendering');

  test('adds view to the page', function () {
    expect(3);
    var player = {toJSON: sinon.spy()};
    ok(!$('.player').length);
    var view = new unit.View({model: player});
    view.render();
    ok($('.player').length);
    sinon.assert.called(player.toJSON);
  });

});

