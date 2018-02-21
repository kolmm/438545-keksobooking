'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var title = noticeForm.querySelector('#title');
  var address = noticeForm.querySelector('#address');
  var type = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var timeIn = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var description = noticeForm.querySelector('#description');
  var formResetBtn = noticeForm.querySelector('.form__reset');
  var noticeFormFeatures = noticeForm.querySelectorAll('.form__element.features input');

  function makeOriginState() {
    title.value = '';
    price.value = '';
    price.min = 0;
    price.placeholder = 5000;
    description.value = '';
    noticeFormFeatures.forEach(function (feature) {
      feature.checked = false;
    });
  }

  function addAttribute(element, name, value) {
    element.setAttribute(name, value);
  }

  title.required = true;
  price.required = true;
  price.max = 1000000;

  addAttribute(noticeForm, 'action', 'https://js.dump.academy/keksobooking');
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

  noticeForm.addEventListener('invalid', function (evt) {
    evt.target.style.borderColor = 'red';
  }, true);

  formResetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();

    makeOriginState();
    window.util.setAddress(true);
  });

  function onSuccess() {
    makeOriginState();
  }

  function onError(response) {
    var errorMessage = document.createElement('div');

    errorMessage.classList.add('error-message');
    errorMessage.textContent = 'Произошла ошибка:' + ' ' + response;
    document.querySelector('.notice').insertBefore(errorMessage, noticeForm);
  }

  noticeForm.addEventListener('submit', function (evt) {
    window.load('https://js.dump.academy/keksobooking', 'POST', new FormData(noticeForm), onSuccess, onError);
    evt.preventDefault();
  });
})();
