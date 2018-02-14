'use strict';
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var title = noticeForm.querySelector('#title');
  var price = noticeForm.querySelector('#price');
  var type = noticeForm.querySelector('#type');
  var address = noticeForm.querySelector('#address');
  var timeIn = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var description = noticeForm.querySelector('#description');
  var formResetBtn = noticeForm.querySelector('.form__reset');
  var noticeFormFeatures = noticeForm.querySelectorAll('.form__element.features input');
  var typeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  function makeOriginState() {
    title.value = '';
    price.value = '';
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

  function makeMinPrice() {
    price.min = typeToPrice[type.value];
    price.placeholder = typeToPrice[type.value];
  }

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
    window.disableCapacity();
  });

  noticeForm.addEventListener('invalid', function (evt) {
    evt.target.style.borderColor = 'red';
  }, true);

  formResetBtn.addEventListener('click', function () {
    makeOriginState();
  });
})();
