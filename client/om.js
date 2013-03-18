define(['jquery', 'lodash', 'sockets'], function ($, _, sockets) {

  var entonate = function (player, event) {
    var deferred = $.Deferred();

    deferred.fail(function (message) {
      console.log(message);
    });

    if (!player.get('current')) {
      deferred.reject('You can\'t play for your opponent!');
      return deferred;
    }

    if (!player.isMyTurn()) {
      deferred.reject('It is not your turn!');
      return deferred;
    }

    var args = _.toArray(arguments).splice(2);
    args.splice(0, 0, deferred);

    deferred.done(function () {
      sockets.emit(event, args);
    });

    setTimeout(function () {
      player[event].apply(player, args);
    }, 0);

    return deferred;
  };

  return entonate;

});
