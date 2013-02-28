define(['jquery', 'underscore'], function ($, _) {

  var entonate = function (player, event) {
    var deferred = $.Deferred();

    if (!player.get('current')) {
      deferred.reject();
      return deferred;
    }

    deferred.fail(function (message) {
      console.log(message);
    });

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
