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

function addAttribute(element, name, value) {
  element.setAttribute(name, value);
}

title.required = true;
price.required = true;

addAttribute(noticeForm, 'action', 'https://js.dump.academy/keksobooking');
addAttribute(title, 'minlength', 30);
addAttribute(title, 'maxlength', 100);
addAttribute(price, 'max', 1000000);
addAttribute(address, 'readonly', true);

function onTypeInput() {
  if (type.value === 'flat') {
    addAttribute(price, 'min', 1000);
  } else if (type.value === 'bungalo') {
    addAttribute(price, 'min', 0);
  } else if (type.value === 'house') {
    addAttribute(price, 'min', 5000);
  } else if (type.value === 'palace') {
    addAttribute(price, 'min', 10000);
  }
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
  console.log('---')

}

roomNumber.addEventListener('change', function () {
  disableCapacity();
});
