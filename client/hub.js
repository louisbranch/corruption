define(['lodash', 'backbone'],
function (_, Backbone) {

  var Hub = function (mainEventReactor, socketEventReactor) {
    var reactor = mainEventReactor;
    var socket = socketEventReactor;

    function sub (event, callback, context) {
      if (toSocket(event)) {
        socket.on(event, callback);
      } else {
        reactor.on(event, callback, context);
      }
    }

    function pub (event) {
      var args = [].slice.call(arguments);
      if (toSocket(event)) {
        socket.emit.apply(socket, args);
      } else {
        reactor.trigger.apply(reactor, args);
      }
    }

    function toSocket (event) {
      var target = event.split(':')[0];
      return target === 'socket';
    }

    return {
      sub: sub,
      pub: pub
    };

  };

  return Hub;

});
