'use strict';

(function () {
  var address = document.querySelector('#address');
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var roomToCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var setAddress = function (isInitial) {
    var x = window.util.mapPinMain.offsetLeft;
    var y = isInitial ? window.util.mapPinMain.offsetTop : window.util.mapPinMain.offsetTop + window.util.mapPinMain.offsetHeight;

    address.value = x + ', ' + y;
  };

  var makeMinPrice = function () {
    price.min = typeToPrice[type.value];
    price.placeholder = typeToPrice[type.value];
  };

  var disableCapacity = function () {
    var capacityOption = window.util.capacity.querySelectorAll('option');
    var capacityValues = roomToCapacity[roomNumber.value];

    capacityOption.forEach(function (option) {
      option.disabled = !capacityValues.includes(option.value);
    });
  };

  window.util = {
    setAddress: setAddress,
    makeMinPrice: makeMinPrice,
    disableCapacity: disableCapacity,
    capacity: document.querySelector('#capacity'),
    mapPinMain: document.querySelector('.map__pin--main')
  };
})();
