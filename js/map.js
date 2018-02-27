'use strict';

(function () {
  var MAIN_PIN_OFFSET_X = 50;
  var MAIN_PIN_OFFSET_Y = 50;
  var MAIN_PIN_MIN_Y = 150;
  var MAIN_PIN_MAX_Y = 500;
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var fieldSet = noticeForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var offers = [];

  fieldSet.forEach(function (field) {
    field.disabled = true;
  });

  window.util.setAddress(true);

  var arraySlice = function (array, start, end) {
    return array.slice(start, end);
  };

  var onSuccess = function (data) {
    offers = data.slice();
    window.renderPins(arraySlice(offers, 0, 5));

    return offers;
  };

  window.filters.filtersForm.addEventListener('change', function () {
    window.card.closeMapCard();
    window.debounce(window.filters.updatePins(offers));
  });

  var makePageActive = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    fieldSet.forEach(function (field) {
      field.disabled = false;
    });
  };

  var onMapClick = function () {
    if (map.classList.contains('map--faded')) {
      window.load('https://js.dump.academy/keksobooking/data', 'GET', '', onSuccess);
      makePageActive();
      window.util.disableCapacity();
      window.util.makeMinPrice();
      window.util.capacity.options[2].selected = true;
    }

    window.util.setAddress(false);
  };

  mapPinMain.addEventListener('mouseup', onMapClick);

  var checkCoords = function (coords) {
    var minX = MAIN_PIN_OFFSET_X;
    var maxX = document.querySelector('.map').offsetWidth - MAIN_PIN_OFFSET_X;
    var minY = MAIN_PIN_MIN_Y - MAIN_PIN_OFFSET_Y;
    var maxY = MAIN_PIN_MAX_Y - MAIN_PIN_OFFSET_Y;

    if (coords.x < minX) {
      coords.x = minX;
    } else if (coords.x > maxX) {
      coords.x = maxX;
    }

    if (coords.y < minY) {
      coords.y = minY;
    } else if (coords.y > maxY) {
      coords.y = maxY;
    }

    return coords;
  };

  var onMapPinMainMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      newCoords = checkCoords(newCoords);

      mapPinMain.style.top = (newCoords.y) + 'px';
      mapPinMain.style.left = (newCoords.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.util.setAddress(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    onMapPinMainMouseDown(evt);
  });
})();
