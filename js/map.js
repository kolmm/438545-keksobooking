'use strict';
var getAvatar = function (num) {
  return 'img/avatars/user0' + num + '.png';
};
var DEFAULT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
function getRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getAddress(x, y) {
  return x + ', ' + y;
}
function getRandomItemFromAnArray(arr) {
  Math.floor(Math.random() * arr.length);
}
function getFeatures() {
  var arr = [];
  var featuresLength = getRandomNumberBetween(1, FEATURES.length);
  for (var i = 0; i < featuresLength; i++) {
    arr[i] = FEATURES[i];
  }
}
var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;
var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
function getMainObject() {
  var offers = [];
  for (var i = 0; i < 8; i++) {
    var locationX = getRandomNumberBetween(300, 900);
    var locationY = getRandomNumberBetween(150, 500);
    offers[i] = {
      author: {
        avatar: getAvatar(i + 1),
      },
      offer: {
        title: getRandomItemFromAnArray(DEFAULT_TITLES),
        adress: getAddress(locationX, locationY),
        price: getRandomNumberBetween(1000, 1000000),
        type: getRandomItemFromAnArray(HOUSE_TYPE),
        rooms: getRandomNumberBetween(1, 5),
        guests: getRandomNumberBetween(1, 4),
        checkin: getRandomItemFromAnArray(TIMES),
        checkout: getRandomItemFromAnArray(TIMES),
        features: getFeatures(),
        description: '',
        photos: PHOTOS
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
  }
  return offers;
}

var map = document.querySelector('.map');

map.classList.remove('map--faded');
function renderPin(pin) {
  var pinTemplate = document.querySelector('template').content;
  var pinElement = pinTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pin.length; i++) {
    var mapPin = document.createElement('button');
    mapPin.className = 'map__pin';
    var imgPin = document.createElement('img');
    mapPin.style.left = pin[i].location.x - 50 / 2 + 'px';
    mapPin.style.top = pin[i].location.y - 70 + 'px';
    imgPin.width = AVATAR_WIDTH;
    imgPin.height = AVATAR_HEIGHT;
    imgPin.src = pin[i].author.avatar;
    mapPin.appendChild(imgPin);
    pinElement.appendChild(mapPin);
    fragment.appendChild(pinElement);

    console.log(getAvatar(i + 1))

  }
  return fragment;
}
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(renderPin(getMainObject()));
