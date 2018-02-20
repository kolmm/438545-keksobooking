'use strict';

(function () {
  var mainObject = window.getMainObject(8);
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.notice__form');
  var fieldSet = noticeForm.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');

  fieldSet.forEach(function (field) {
    field.disabled = true;
  });

  window.util.setAddress(true);

  function makePageActive() {
    var mapPins = document.querySelector('.map__pins');

    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    fieldSet.forEach(function (field) {
      field.disabled = false;
    });
    // mainObject.forEach(function (object) {
    //   mapPins.appendChild(window.renderPin(object));
    // });
    window.renderPins();
  }

  function onMapClick() {
    if (map.classList.contains('map--faded')) {
      makePageActive();
      window.util.disableCapacity();
      window.util.makeMinPrice();
      window.util.capacity.options[2].selected = true;
    }

    window.util.setAddress(false);
  }

  mapPinMain.addEventListener('mouseup', onMapClick);
})();
