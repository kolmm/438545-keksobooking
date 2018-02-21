'use strict';

(function () {
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var map = document.querySelector('.map');

  function onPinClick(evt, pin) {
    var mapFilters = document.querySelector('.map__filters-container');
    var adCards = map.querySelectorAll('.map__card');

    map.insertBefore(window.renderCard(pin), mapFilters);

    if (adCards.length) {
      map.removeChild(adCards[0]);
    }
  }

  window.makePin = function (pin) {
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
  };

  function renderPins(data) {
    var mapPins = document.querySelector('.map__pins');

    data.forEach(function (object) {
      mapPins.appendChild(window.makePin(object));
    });
  }

  window.getPins = function () {
    var onSuccess = function (data) {

      renderPins(data);
    };

    window.load('https://js.dump.academy/keksobooking/data', onSuccess);
  };
})();
