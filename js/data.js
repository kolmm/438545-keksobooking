'use strict';

(function () {
  var offers = [];

  var addOffers = function (offersArr) {
    offersArr.forEach(function (value) {
      offers.push(value);
    });
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

  var price = {
    LOW: 10000,
    HIGH: 50000
  };

  var filterOffers = function (offersCurrent, filterCurrent) {
    if (filterCurrent.value === 'any' || filterCurrent.value === false) {
      return offersCurrent;
    }
    if (filtersForOffersId[filterCurrent.id] === 'price') {
      if (filtersForOffersValue[filterCurrent.value] === 'LOW') {
        return offersCurrent.filter(function (value) {
          return value.offer.price < price.LOW;
        });
      } else if (filtersForOffersValue[filterCurrent.value] === 'HIGH') {
        return offersCurrent.filter(function (value) {
          return value.offer.price > price.HIGH;
        });
      } else if (filtersForOffersValue[filterCurrent.value] === 'MIDDLE') {
        return offersCurrent.filter(function (value) {
          return (value.offer.price <= price.HIGH && value.offer.price >= price.LOW);
        });
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
console.log(filters)

    filters.forEach(function (value) {
      newOffers = filterOffers(newOffers, value);
    });
    if (newOffers.length > 5) {
      newOffers = newOffers.slice(0, 5);
    }

    return newOffers;
  };

  window.data = {
    addOffers: addOffers,
    getOffers: getOffers
  };
})();
