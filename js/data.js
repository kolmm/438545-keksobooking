'use strict';

(function () {
  var MAX_PINS = 5;
  var offers = [];

  var price = {
    LOW: 10000,
    HIGH: 50000
  };

  var filtersForOffersId = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
    'filter-wifi': 'wifi',
    'filter-dishwasher': 'dishwasher',
    'filter-parking': 'parking',
    'filter-washer': 'washer',
    'filter-elevator': 'elevator',
    'filter-conditioner': 'conditioner'
  };

  var filtersForOffersValue = {
    'middle': 'MIDDLE',
    'low': 'LOW',
    'high': 'HIGH'
  };

  var addOffers = function (offersArr) {
    offers = offersArr.slice();
  };

  var offersSlice = function () {
    return offers.slice(0, 5);
  };

  var filterOffers = function (offersCurrent, filterCurrent) {
    var filterCurrentSplit = filterCurrent.id.split('-')[0];

    if (filterCurrent.value === 'any' || filterCurrent.value === false) {
      return offersCurrent;
    } else if (filterCurrentSplit === 'filter') {
      return offersCurrent.filter(function (value) {
        return value.offer.features.indexOf(filtersForOffersId[filterCurrent.id]) > -1;
      });
    } else if (filtersForOffersId[filterCurrent.id] === 'price') {
      switch (filtersForOffersValue[filterCurrent.value]) {
        case 'LOW':
          return offersCurrent.filter(function (value) {
            return value.offer.price < price.LOW;
          });
        case 'MIDDLE':
          return offersCurrent.filter(function (value) {
            return (value.offer.price <= price.HIGH && value.offer.price >= price.LOW);
          });
        case 'HIGH':
          return offersCurrent.filter(function (value) {
            return value.offer.price > price.HIGH;
          });
        default:
      }
    } else {
      return offersCurrent.filter(function (value) {
        return value.offer[filtersForOffersId[filterCurrent.id]].toString() === filterCurrent.value;
      });
    }
    return offersCurrent;
  };

  var getOffers = function (filters) {
    var newOffers = offers.slice();

    filters.forEach(function (value) {
      newOffers = filterOffers(newOffers, value);
    });
    if (newOffers.length > MAX_PINS) {
      newOffers = newOffers.slice(0, 5);
    }

    return newOffers;
  };

  window.data = {
    addOffers: addOffers,
    offersSlice: offersSlice,
    getOffers: getOffers
  };
})();
