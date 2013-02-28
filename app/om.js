define(['jquery', 'underscore'], function ($, _) {

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

    deferred.done(function () {
      console.log(player.get('id'), event);
    });

    var args = _.toArray(arguments).splice(2);
    args.splice(0, 0, deferred);

    setTimeout(function () {
      player[event].apply(player, args);
    }, 0);

    return deferred;
  };

  return entonate;

});
