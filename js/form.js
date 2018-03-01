'use strict';

(function () {
  window.noticeForm = document.querySelector('.notice__form');
  var title = window.noticeForm.querySelector('#title');
  var address = window.noticeForm.querySelector('#address');
  var type = window.noticeForm.querySelector('#type');
  var price = window.noticeForm.querySelector('#price');
  var timeIn = window.noticeForm.querySelector('#timein');
  var timeout = window.noticeForm.querySelector('#timeout');
  var roomNumber = window.noticeForm.querySelector('#room_number');
  var description = window.noticeForm.querySelector('#description');
  var formResetBtn = window.noticeForm.querySelector('.form__reset');
  var noticeFormFeatures = window.noticeForm.querySelectorAll('.form__element.features input');

  var makeOriginState = function () {
    title.value = '';
    price.value = '';
    price.min = 0;
    price.placeholder = 5000;
    description.value = '';
    noticeFormFeatures.forEach(function (feature) {
      feature.checked = false;
    });
    window.map.movePinToInitial();
    window.card.closeMapCard();
    window.pin.removePins();
    window.map.makePageInActive();
  };

  var addAttribute = function (element, name, value) {
    element.setAttribute(name, value);
  };

  title.required = true;
  price.required = true;
  price.max = 1000000;

  addAttribute(window.noticeForm, 'action', 'https://js.dump.academy/keksobooking');
  addAttribute(title, 'minlength', 30);
  addAttribute(title, 'maxlength', 100);
  addAttribute(address, 'readonly', true);

  type.addEventListener('change', function () {
    window.util.makeMinPrice();
  });

  timeIn.addEventListener('change', function (evt) {
    timeout.value = evt.target.value;
  });

  timeout.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  roomNumber.addEventListener('change', function () {
    window.util.disableCapacity();
  });

  window.noticeForm.addEventListener('invalid', function (evt) {
    evt.target.style.borderColor = 'red';
  }, true);

  formResetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    makeOriginState();
    window.util.setAddress(true);
  });

  var onSuccess = function () {
    makeOriginState();
    window.util.setAddress(true);
  };

  var onError = function (response) {
    var errorMessage = document.createElement('div');

    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Произошла ошибка:' + ' ' + response;
    document.querySelector('.notice').insertBefore(errorMessage, window.noticeForm);

    setTimeout(function () {
      errorMessage.remove();
    }, 5000);
  };

  window.noticeForm.addEventListener('submit', function (evt) {
    window.load('https://js.dump.academy/keksobooking', 'POST', new FormData(window.noticeForm), onSuccess, onError);
    evt.preventDefault();
  });
})();
