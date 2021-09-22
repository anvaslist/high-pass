'use strict';

// создание табов
const servicesBtns = document.querySelectorAll('.services__tab');
const servicesTabs = document.querySelector('.services__tabs');
const servicesLists = document.querySelectorAll('.services__list');
const servicesWorks = document.querySelectorAll('.services__works');

servicesTabs.addEventListener('click', (e) => {
  const target = e.target;
  const index = Array.from(servicesBtns).indexOf(target);
  if (target.matches('.services__tab')) {
    showElem(servicesLists, 'services__list_active', index);
    showElem(servicesWorks, 'services__works_active', index);
    showElem(servicesBtns, 'services__tab_active', index);
  }
});

function showElem(elems, elemsClass, ind) {
  elems.forEach((elem, i) => {
    switch (i) {
      case ind:
        elem.classList.add(elemsClass);
        break;
      default:
        elem.classList.remove(elemsClass);
        break;
    }
  });
}