'use strict';

(function () {
  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');
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

  function setAddress(isInitial) {
    var x = mapPinMain.offsetLeft;
    var y = isInitial ? mapPinMain.offsetTop : mapPinMain.offsetTop + mapPinMain.offsetHeight;

    address.value = x + ', ' + y;
  }

  function makeMinPrice() {
    price.min = typeToPrice[type.value];
    price.placeholder = typeToPrice[type.value];
  }

  function disableCapacity() {
    var capacityOption = window.util.capacity.querySelectorAll('option');
    var capacityValues = roomToCapacity[roomNumber.value];

    capacityOption.forEach(function (option) {
      option.disabled = !capacityValues.includes(option.value);
    });
  }

  var getNoticeFormValue = function (form) {
    var arrValue = [];
    form.querySelectorAll('[name]').forEach(function (value) {
      var valueCurent = {};
      switch (value.tagName.toLocaleLowerCase()) {
        case 'input':
          if (value.type === 'checkbox') {
            valueCurent = {id: value.id, value: value.checked};
          } else {
            valueCurent = {id: value.id, value: value.value};
          }
          break;
        case 'select':
          valueCurent = {id: value.id, value: value.value};
          break;
        case 'textarea':
          valueCurent = {id: value.id, value: value.value};
          break;
        default:
      }
      arrValue.push(valueCurent);
    });
    return arrValue;
  };

  window.util = {
    setAddress: setAddress,
    makeMinPrice: makeMinPrice,
    disableCapacity: disableCapacity,
    capacity: document.querySelector('#capacity'),
    getNoticeFormValue: getNoticeFormValue
  };
})();
