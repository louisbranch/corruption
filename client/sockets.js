define([], function () {
  var io = window.io;

  var socket = io.connect('/');

  return socket;
});
