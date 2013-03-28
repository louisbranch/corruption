define(['models/player'], function (unit) {

  module('player model register socket event', {
    setup: function () {
      this.realPlayer = unit.Player;
    },
    teardown: function () {
      unit.Player = this.realPlayer;
    }
  });

  test('register socket:player:joined event', function () {
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

  module('player initialization');

  test('has hub access', function () {
    expect(1);
    var hub = {};
    var player = new unit.Player({}, {hub: hub});
    equal(player.hub, hub);
  });


});

