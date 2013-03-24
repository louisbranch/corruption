define(['hub'], function (Hub) {

  var setup = function () {
    this.reactor = {on: sinon.spy(), trigger: sinon.spy()};
    this.socket = {on: sinon.spy(), emit: sinon.spy()};
    this.hub = new Hub(this.reactor, this.socket);
  };

  module('subscribing to events', { setup: setup });

  test('socket events are delegated to socket module', function () {
    expect(1);
    this.hub.sub('socket:join');
    sinon.assert.calledWith(this.socket.on, 'socket:join');
  });

  test('other events are delegated to reactor module', function () {
    expect(1);
    var callback = function () {};
    var context = {};
    this.hub.sub('game:join', callback, context);
    sinon.assert.calledWith(this.reactor.on, 'game:join', callback, context);
  });

  module('publishing events', { setup: setup });

  test('socket events are delegated to socket module', function () {
    expect(1);
    this.hub.pub('socket:join', 'param1', 'param2');
    sinon.assert.calledWith(this.socket.emit, 'socket:join', 'param1', 'param2');
  });

  test('other events are delegated to reactor module', function () {
    expect(1);
    this.hub.pub('game:join', 'param1', 'param2');
    sinon.assert.calledWith(this.reactor.trigger, 'game:join', 'param1', 'param2');
  });

});
