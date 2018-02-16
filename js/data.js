'use strict';
(function () {
  var HOUSE_TYPE = ['flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var DEFAULT_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

  function getAvatar(num) {
    return 'img/avatars/user0' + num + '.png';
  }

  function getAddress(x, y) {
    return x + ', ' + y;
  }

  function getRandomItemFromAnArray(arr) {
    var number = Math.floor(Math.random() * arr.length);

    return arr[number];
  }

  function getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getFeatures() {
    var arr = [];
    var featuresLength = getRandomNumberBetween(1, FEATURES.length);

    for (var i = 0; i < featuresLength; i++) {
      arr[i] = FEATURES[i];
    }

    return arr;
  }

  window.getMainObject = function (number) {
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
  };
})();
