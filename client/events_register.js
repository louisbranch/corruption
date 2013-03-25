define([
       'views/login',
       'models/player'
], function () {

  var args = [].slice.call(arguments);

  function init (hub) {
    args.forEach(function (dependency) {
      dependency.register(hub);
    })
  }

  return {
    init: init
  };

});
