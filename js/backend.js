'use strict';

(function () {
  var TEN_SECONDS = 10000;
  var SUCCESSFULL_RESPONSE_STATUS = 200;

  window.load = function (url, method, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESSFULL_RESPONSE_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TEN_SECONDS;

    xhr.open(method, url);
    xhr.send(data);
  };
})();
