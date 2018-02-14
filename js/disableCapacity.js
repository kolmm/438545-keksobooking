
'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');  
  var roomToCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  window.disableCapacity = function () {
    var capacityOption = capacity.querySelectorAll('option');
    var capacityValues = roomToCapacity[roomNumber.value];

    capacityOption.forEach(function (option) {
      option.disabled = !capacityValues.includes(option.value);
    });
  };
})();
