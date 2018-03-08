'use strict';

(function () {
  var ESC_CLICK = 27;
  var SYMBOL_OF_RUBLE = String.fromCharCode(8381);
  var PHOTO_HEIGHT = 40;

  var deleteChildren = function (el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.firstChild);
    }
  };

  var createFeatures = function (features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('feature', 'feature--' + feature);
      fragment.appendChild(featureItem);
    });

    return fragment;
  };

  var createImg = function (images) {
    var fragment = document.createDocumentFragment();

    images.forEach(function (image) {
      var imageItem = document.createElement('li');
      var imgInPicture = document.createElement('img');

      imgInPicture.src = image;
      imgInPicture.height = PHOTO_HEIGHT;
      imageItem.appendChild(imgInPicture);
      fragment.appendChild(imageItem);
    });

    return fragment;
  };

  var renderCard = function (card) {
    var adCardTemplate = window.pin.template.content.querySelector('.map__card');
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
    adCard.querySelector('.popup__price').textContent = card.offer.price + ' ' + SYMBOL_OF_RUBLE + '/ночь';
    adCard.querySelector('h4').textContent = homeType[card.offer.type].ru;
    adCard.querySelector('.popup__company').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    adCard.querySelector('.popup__size').textContent = 'Заезд после ' + card.offer.checkin + ',' + 'выезд до ' + card.offer.checkout;
    popupFeatures.appendChild(createFeatures(card.offer.features));
    adCard.querySelector('.popup__description').textContent = card.offer.description;
    adCard.querySelector('.popup__avatar').src = card.author.avatar;
    popupPictures.appendChild(createImg(card.offer.photos));

    closePopupBtn.addEventListener('click', function () {
      closeMapCard();
    });

    document.addEventListener('keydown', function (evt) {
      onMapCardEscPress(evt);
    });

    return adCard;
  };

  var closeMapCard = function () {
    var popup = window.map.find.querySelector('.popup');

    if (popup !== null) {
      popup.parentNode.removeChild(popup);
    }

    document.removeEventListener('keydown', onMapCardEscPress);
  };

  var onMapCardEscPress = function (evt) {
    if (evt.keyCode === ESC_CLICK) {
      closeMapCard();
    }
  };

  window.card = {
    render: renderCard,
    close: closeMapCard
  };
})();
