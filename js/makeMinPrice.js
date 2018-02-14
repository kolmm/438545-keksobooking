
'use strict';

(function () {
  var price = document.querySelector('#price');
  var type = document.querySelector('#type');
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  window.makeMinPrice = function () {
    price.min = typeToPrice[type.value];
    price.placeholder = typeToPrice[type.value];
  };
})();
