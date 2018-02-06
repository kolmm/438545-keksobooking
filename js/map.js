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
  var number = Math.floor(Math.random() * arr.length);

  return arr[number];
}
function getFeatures() {
  var arr = [];
  var featuresLength = getRandomNumberBetween(1, FEATURES.length);
  for (var i = 0; i < featuresLength; i++) {
    arr[i] = FEATURES[i];
  }
  return arr;
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
        address: getAddress(locationX, locationY),
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
    var imgPin = document.createElement('img');

    mapPin.className = 'map__pin';
    mapPin.style.left = pin[i].location.x - 50 / 2 + 'px';
    mapPin.style.top = pin[i].location.y - 70 + 'px';
    imgPin.width = AVATAR_WIDTH;
    imgPin.height = AVATAR_HEIGHT;
    imgPin.src = pin[i].author.avatar;
    mapPin.appendChild(imgPin);
    pinElement.appendChild(mapPin);
    fragment.appendChild(pinElement);
  }
  return fragment;
}
var mapPins = document.querySelector('.map__pins');

mapPins.appendChild(renderPin(getMainObject()));

function renderCard(card) {
  var adCard = document.querySelector('.popup').cloneNode(true);
  var popupFeatures = adCard.querySelector('.popup__features');
  var popupPictures = adCard.querySelector('.popup__pictures');
  var homeType = '';

  if (card[0].offer.type === 'flat') {
    homeType = 'Квартира';
  } if (card[0].offer.type === 'bungalo') {
    homeType = 'Бунгало';
  } if (card[0].offer.type === 'house') {
    homeType = 'Дом';
  }

  adCard.querySelector('h3').textContent = card[0].offer.title;
  adCard.querySelector('small').textContent = card[0].offer.address;
  adCard.querySelector('.popup__price').innerHtml = card[0].offer.price + '&#x20bd;/ночь';
  adCard.querySelector('h4').textContent = homeType;
  adCard.querySelector('.popup__company').textContent = card[0].offer.rooms + ' комнаты для ' + card[0].offer.guests + ' гостей';
  adCard.querySelector('.popup__size').textContent = 'Заезд после ' + card[0].offer.checkin + ',' + 'выезд до ' + card[0].offer.checkout;
  popupFeatures.appendChild(createFeatures(card[0].offer.features));
  adCard.querySelector('.popup__description').textContent = card[0].offer.description;
  adCard.querySelector('.popup__avatar').src = card[0].author.avatar;
  popupPictures.appendChild(createImg(card[0].offer.photos));

  return adCard;
}

function createFeatures(data) {
  var features = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var feature = document.createElement('li');
    feature.classList.add('feature', 'feature--' + data[i]);
    features.appendChild(feature);
  }
  return features;
}

function createImg(data) {
  var images = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var image = document.createElement('li');
    image.innerHTML = '<img src="' + data[i] + '" height="40">';
    images.appendChild(image);
  }
  return images;
}

var mapFilters = document.querySelector('.map__filters-container');

map.insertBefore(renderCard(getMainObject()), mapFilters);
