
'use strict';

(function () {
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  window.setAddress = function (isInitial) {
    var x = mapPinMain.offsetLeft;
    var y = isInitial ? mapPinMain.offsetTop : mapPinMain.offsetTop + mapPinMain.offsetHeight;

    address.value = x + ', ' + y;
  };
})();
