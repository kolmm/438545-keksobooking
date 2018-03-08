'use strict';

(function () {
  var MAX_PINS = 5;
  var TIME_TO_DELETE_ERROR = 500;
  var PRICES_TO_COMPARE = {
    low: 10000,
    high: 50000
  };
  var findForm = document.querySelector('.map__filters');

  var updatePins = function () {
    var filteredOffers = window.map.offers().slice();
    var selectorFilters = findForm.querySelectorAll('select');
    var featuresFilters = findForm.querySelectorAll('input[type=checkbox]:checked');
    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var filterByValue = function (element, property) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer[property].toString() === element.value;
      });
    };

    var filterByPrice = function (priceFilter) {
      return filteredOffers.filter(function (offerData) {

        var priceFilterValues = {
          'middle': offerData.offer.price >= PRICES_TO_COMPARE.low && offerData.offer.price < PRICES_TO_COMPARE.high,
          'low': offerData.offer.price < PRICES_TO_COMPARE.low,
          'high': offerData.offer.price >= PRICES_TO_COMPARE.high
        };

        return priceFilterValues[priceFilter.value];
      });
    };

    var filterByFeatures = function (item) {
      return filteredOffers.filter(function (offerData) {
        return offerData.offer.features.indexOf(item.value) >= 0;
      });
    };

    if (selectorFilters.length !== null) {
      selectorFilters.forEach(function (item) {
        if (item.value !== 'any') {
          if (item.id !== 'housing-price') {
            filteredOffers = filterByValue(item, FilterRules[item.id]);
          } else {
            filteredOffers = filterByPrice(item);
          }
        }
      });
    }

    if (featuresFilters !== null) {
      featuresFilters.forEach(function (item) {
        filteredOffers = filterByFeatures(item);
      });
    }

    if (filteredOffers.length > window.filter.MAX_PINS) {
      filteredOffers = filteredOffers.slice(0, window.filter.MAX_PINS);
    }

    if (filteredOffers.length) {
      window.pin.renderAll(filteredOffers);
    }
  };

  findForm.addEventListener('change', function () {
    window.card.close();
    window.debounce(updatePins(), TIME_TO_DELETE_ERROR);
  });

  window.filter = {
    updatePins: updatePins,
    MAX_PINS: MAX_PINS
  };
})();
