'use strict';

var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;

function renderPin(pin) {
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPin = pinTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  var imgPin = mapPin.querySelector('img');

  mapPin.className = 'map__pin';
  mapPin.style.left = pin.location.x - 50 / 2 + 'px';
  mapPin.style.top = pin.location.y - 70 + 'px';
  imgPin.width = AVATAR_WIDTH;
  imgPin.height = AVATAR_HEIGHT;
  imgPin.src = pin.author.avatar;

  mapPin.appendChild(imgPin);
  fragment.appendChild(mapPin);

  mapPin.addEventListener('click', function (evt) {
    onPinClick(evt, pin);
  });

  return fragment;
}

var mainObject = window.getMainObject(8);
var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var fieldSet = noticeForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');

fieldSet.forEach(function (field) {
  field.disabled = true;
});

function onPinClick(evt, pin) {
  var mapFilters = document.querySelector('.map__filters-container');

  map.insertBefore(window.renderCard(pin), mapFilters);
}

window.setAddress(true);

function makePageActive() {
  var mapPins = document.querySelector('.map__pins');

  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  fieldSet.forEach(function (field) {
    field.disabled = false;
  });
  mainObject.forEach(function (object) {
    mapPins.appendChild(renderPin(object));
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
