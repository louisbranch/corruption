define(['jquery', 'underscore'], function ($, _) {

  var entonate = function (player, event) {
    var deferred = $.Deferred();

    deferred.fail(function (message) {
      console.log(message);
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
