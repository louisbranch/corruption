define(['jquery', 'underscore'], function ($, _) {

  var entonate = function (player, event) {
    var deferred = $.Deferred();

    var args = _.toArray(arguments).splice(2);
    args.splice(0, 0, deferred);

    player[event].apply(player, args);
  };

  return entonate;

});
