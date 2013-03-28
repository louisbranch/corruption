define(['models/player'], function (unit) {

  module('player model register socket event', {
    setup: function () {
      this.realPlayer = unit.Player;
    },
    teardown: function () {
      unit.Player = this.realPlayer;
    }
  });

  test('subscribes to socket:player:joined event', function () {
    expect(1);
    var hub = {sub: sinon.spy()};
    unit.register(hub);
    sinon.assert.calledWith(hub.sub, 'socket:player:joined');
  });

  test('socket:player:joined creates a new player', function () {
    expect(2);
    var Player = unit.Player = sinon.spy();
    var hub = {sub: function(name, cb){ cb({id: 1, name: 'Luiz'}); }};
    unit.register(hub);
    sinon.assert.calledWithNew(Player);
    sinon.assert.calledWith(Player, {id: 1, name: 'Luiz'}, {hub: hub});
  });

  module('player model initialization');

  test('has hub access', function () {
    expect(1);
    var hub = {sub: sinon.spy()};
    var player = new unit.Player({}, {hub: hub});
    equal(player.hub, hub);
  });

  test('subscribes to socket:player:setCurrent event', function () {
    expect(1);
    var hub = {sub: sinon.spy()};
    var player = new unit.Player({}, {hub: hub});
    sinon.assert.calledWith(hub.sub, 'socket:player:setCurrent');
  });

  test('sets current player', function () {
    expect(2);
    var hub = {sub: function(name, cb){ cb({id: 1}); }};
    var player1 = new unit.Player({id: 1}, {hub: hub});
    var player2 = new unit.Player({id: 2}, {hub: hub});
    ok(player1.current);
    ok(!player2.current);
  });

});
