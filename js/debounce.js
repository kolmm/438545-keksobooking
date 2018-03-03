'use strict';

(function () {
  var lastTimeout;

  window.debounce = function (fun, time) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, time);
  };
})();
