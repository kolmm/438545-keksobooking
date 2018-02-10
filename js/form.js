'use strict';

var noticeForm = document.querySelector('.notice__form');
var title = document.querySelector('#title');
var price = document.querySelector('#price');
var type = document.querySelector('#type');
var address = document.querySelector('#address');
var timeIn = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');
var typeToPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var roomToCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

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

function onTypeInput() {
  price.min = typeToPrice[type.value];
}

type.addEventListener('change', function () {
  onTypeInput();
});

timeIn.addEventListener('change', function (evt) {
  timeout.value = evt.target.value;
});

timeout.addEventListener('change', function (evt) {
  timeIn.value = evt.target.value;
});

function disableCapacity() {
  var capacityOption = capacity.querySelectorAll('option');
  var capacityValues = roomToCapacity[roomNumber.value];

  capacityOption.forEach(function (option) {
    option.disabled = !capacityValues.includes(option.value);
  });
}

roomNumber.addEventListener('change', function () {
  disableCapacity();
});
