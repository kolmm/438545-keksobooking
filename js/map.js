'use strict';

(function () {
  var MAIN_PIN_OFFSET_X = 50;
  var MAIN_PIN_OFFSET_Y = 50;
  var MAIN_PIN_MIN_Y = 150;
  var MAIN_PIN_MAX_Y = 500;
  var BOOKINGS_URL = 'https://js.dump.academy/keksobooking/data';
  var findMap = document.querySelector('.map');
  var fieldSet = window.form.find.querySelectorAll('fieldset');
  var offers = [];

  fieldSet.forEach(function (field) {
    field.disabled = true;
  });

  window.form.setAddress(true);

  var arraySlice = function (array, start, end) {
    return array.slice(start, end);
  };

  var onSuccess = function (data) {
    offers = data.slice();
    window.pin.renderAll(arraySlice(offers, 0, window.filter.MAX_PINS));

    return offers;
  };

  window.filter.find.addEventListener('change', function () {
    window.card.close();
    window.debounce(window.filter.updatePins(offers), 500);
  });

  var makePageActive = function () {
    findMap.classList.remove('map--faded');
    window.form.find.classList.remove('notice__form--disabled');
    fieldSet.forEach(function (field) {
      field.disabled = false;
    });
  };

  var makePageInActive = function () {
    findMap.classList.add('map--faded');
    window.form.find.classList.add('notice__form--disabled');
    fieldSet.forEach(function (field) {
      field.disabled = true;
    });
  };

  var onMapClick = function () {
    if (findMap.classList.contains('map--faded')) {
      window.backend.request(BOOKINGS_URL, 'GET', '', onSuccess, window.form.onError);
      makePageActive();
      window.form.disableCapacity();
      window.form.makeMinPrice();
    }

    window.form.setAddress(false);
  };

  window.form.mapPinMain.addEventListener('mouseup', onMapClick);

  var checkCoords = function (coords) {
    var minX = MAIN_PIN_OFFSET_X;
    var maxX = findMap.offsetWidth - MAIN_PIN_OFFSET_X;
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
        x: window.form.mapPinMain.offsetLeft - shift.x,
        y: window.form.mapPinMain.offsetTop - shift.y
      };

      newCoords = checkCoords(newCoords);

      window.form.mapPinMain.style.top = (newCoords.y) + 'px';
      window.form.mapPinMain.style.left = (newCoords.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(false);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.form.mapPinMain.addEventListener('mousedown', function (evt) {
    onMapPinMainMouseDown(evt);
  });

  window.map = {
    find: findMap,
    movePinToInitial: function () {
      window.form.mapPinMain.style.left = '';
      window.form.mapPinMain.style.top = '';
    },
    makePageInActive: makePageInActive
  };
})();
