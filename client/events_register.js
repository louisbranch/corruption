define(['views/login'],
function (loginView) {

  function init (hub) {
    loginView.register(hub);
  }

  return {
    init: init
  };

});
