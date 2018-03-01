'use strict';

(function () {
  var TIME_TO_DEL_ERROR = 5000;
  var noticeForm = document.querySelector('.notice__form');
  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var timeIn = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var formResetBtn = noticeForm.querySelector('.form__reset');
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
    var capacityOption = window.form.capacity.querySelectorAll('option');
    var capacityValues = roomToCapacity[roomNumber.value];

    capacityOption.forEach(function (option) {
      option.disabled = !capacityValues.includes(option.value);
    });
  };

  var makeOriginState = function () {
    noticeForm.reset();
    window.form.capacity.options[2].selected = true;
    price.min = 0;
    price.placeholder = 5000;
    window.map.movePinToInitial();
    window.card.closeMapCard();
    window.pin.removePins();
    window.map.makePageInActive();
    disableCapacity();
  };

  var addAttribute = function (element, name, value) {
    element.setAttribute(name, value);
  };

  title.required = true;
  price.required = true;
  price.max = 1000000;

  addAttribute(noticeForm, 'action', 'https://js.dump.academy/keksobooking');
  addAttribute(title, 'minlength', 30);
  addAttribute(title, 'maxlength', 100);
  addAttribute(address, 'readonly', true);

  type.addEventListener('change', function () {
    makeMinPrice();
  });

  timeIn.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  roomNumber.addEventListener('change', function () {
    disableCapacity();
  });

  noticeForm.addEventListener('invalid', function (evt) {
    evt.target.style.borderColor = 'red';
  }, true);

  formResetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    makeOriginState();
    setAddress(true);
  });

  var onSuccess = function () {
    makeOriginState();
    setAddress(true);
  };

  var onError = function (response) {
    var errorMessage = document.createElement('div');

    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Произошла ошибка:' + ' ' + response;
    document.querySelector('.notice').insertBefore(errorMessage, noticeForm);

    setTimeout(function () {
      errorMessage.remove();
    }, TIME_TO_DEL_ERROR);
  };

  noticeForm.addEventListener('submit', function (evt) {
    window.load('https://js.dump.academy/keksobooking', 'POST', new FormData(noticeForm), onSuccess, onError);
    evt.preventDefault();
  });

  window.form = {
    noticeForm: noticeForm,
    setAddress: setAddress,
    makeMinPrice: makeMinPrice,
    capacity: document.querySelector('#capacity'),
    disableCapacity: disableCapacity
  };
})();
