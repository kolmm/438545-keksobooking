'use strict';

var mainObject = window.getMainObject(8);
var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var fieldSet = noticeForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');

fieldSet.forEach(function (field) {
  field.disabled = true;
});

window.setAddress(true);

function makePageActive() {
  var mapPins = document.querySelector('.map__pins');

  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  fieldSet.forEach(function (field) {
    field.disabled = false;
  });
  mainObject.forEach(function (object) {
    mapPins.appendChild(window.renderPin(object));
  });
}

function onMapClick() {
  if (map.classList.contains('map--faded')) {
    makePageActive();
    window.disableCapacity();
    window.makeMinPrice();
  }

  window.setAddress(false);
}

mapPinMain.addEventListener('mouseup', onMapClick);
