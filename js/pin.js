'use strict';

(function () {
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var map = document.querySelector('.map');

  var onPinClick = function (evt, pin) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var adCards = map.querySelectorAll('.map__card');

    map.insertBefore(window.renderCard(pin), mapFiltersContainer);

    if (adCards.length) {
      map.removeChild(adCards[0]);
    }
  };

  var makePin = function (pin) {
    var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var mapPin = pinTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    var imgPin = mapPin.querySelector('img');

    mapPin.className = 'map__pin';
    mapPin.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    mapPin.style.top = pin.location.y - PIN_HEIGHT + 'px';
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

  window.renderPins = function (data) {
    var mapPins = document.querySelector('.map__pins');

    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (value) {
      value.remove();
    });
    data.forEach(function (object) {
      mapPins.appendChild(makePin(object));
    });
  };
})();
