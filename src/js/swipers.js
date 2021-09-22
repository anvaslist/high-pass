'use strict';

// свайпер
const swiper = new Swiper('.swiper', {
  loop: true,
  onTouchStart: function () {
    return false;
  },
  spaceBetween: 30,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    }
  },
});