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

function deleteChildren(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }
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

var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;
var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

function getMainObject(number) {
  var offers = [];

  for (var i = 0; i < number; i++) {
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

function renderCard(card) {
  var adCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var adCard = adCardTemplate.cloneNode(true);
  var popupFeatures = adCard.querySelector('.popup__features');
  var popupPictures = adCard.querySelector('.popup__pictures');
  var homeType = {
    flat: {ru: 'Квартира'},
    house: {ru: 'Дом'},
    bungalo: {ru: 'Бунгало'}
  };
  var closePopupBtn = adCard.querySelector('.popup__close');

  deleteChildren(popupFeatures);
  deleteChildren(popupPictures);

  adCard.querySelector('h3').textContent = card.offer.title;
  adCard.querySelector('small').textContent = card.offer.address;
  adCard.querySelector('.popup__price').innerHtml = card.offer.price + '&#x20bd;/ночь';
  adCard.querySelector('h4').textContent = homeType[card.offer.type].ru;
  adCard.querySelector('.popup__company').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  adCard.querySelector('.popup__size').textContent = 'Заезд после ' + card.offer.checkin + ',' + 'выезд до ' + card.offer.checkout;
  popupFeatures.appendChild(createFeatures(card.offer.features));
  adCard.querySelector('.popup__description').textContent = card.offer.description;
  adCard.querySelector('.popup__avatar').src = card.author.avatar;
  popupPictures.appendChild(createImg(card.offer.photos));

  closePopupBtn.addEventListener('click', function (evt) {
    map.removeChild(evt.target.parentNode);
  });

  return adCard;
}

var mainObject = getMainObject(8);
var map = document.querySelector('.map');
var noticeForm = document.querySelector('.notice__form');
var fieldSet = noticeForm.querySelectorAll('fieldset');
var mapPinMain = document.querySelector('.map__pin--main');
var address = noticeForm.querySelector('#address');

fieldSet.forEach(function (field) {
  field.disabled = true;
});

function onPinClick(evt, pin) {
  var mapFilters = document.querySelector('.map__filters-container');

  map.insertBefore(renderCard(pin), mapFilters);
}

function setAddress(isInitial) {
  var x = mapPinMain.offsetLeft;
  var y = isInitial ? mapPinMain.offsetTop : mapPinMain.offsetTop + mapPinMain.offsetHeight;

  address.value = x + ', ' + y;
}

setAddress(true);

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
  }

  setAddress(false);
}

mapPinMain.addEventListener('mouseup', onMapClick);
