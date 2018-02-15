'use strict';

(function () {
  var ESC_CLICK = 27;
  var map = document.querySelector('.map');

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

  window.renderCard = function (card) {
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

    closePopupBtn.addEventListener('click', function () {
      // map.removeChild(evt.target.parentNode);
      closeMapCard(adCard);
    });

    document.addEventListener('keydown', function (evt) {
      onMapCardEscPress(evt, adCard);
    });

    return adCard;
  };

  // Что-то не так с removeChild сыпятся ошибки пока не разобрался почему
  function closeMapCard(adCard) {
    map.removeChild(adCard);

    document.removeEventListener('keydown', onMapCardEscPress);
  }

  function onMapCardEscPress(evt, adCard) {
    if (evt.keyCode === ESC_CLICK) {
      closeMapCard(adCard);
    }
  }
})();
