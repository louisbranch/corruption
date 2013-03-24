define(['views/login'],
function (loginView) {

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
