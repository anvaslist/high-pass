'use strict';

// табы проектов
function projectsTabs(tabsParentSelector) {
  const tabs = document.querySelector(tabsParentSelector);
  const tabBtns = tabs.querySelectorAll('.projects__tab');
  const projectsHolders = document.querySelectorAll('.projects__holder');
  tabs.addEventListener('click', (e) => {
    const target = e.target;
    const index = Array.from(tabBtns).indexOf(target);
    if (target.matches('.projects__tab')) {
      showElem(projectsHolders, 'projects__holder_active', index);
      showElem(tabBtns, 'projects__tab_active', index);
    }
  });
}

projectsTabs('.projects__tabs_desk');
projectsTabs('.projects__tabs_mobile');

// табы услуг
const servicesTabs = document.querySelector('.services__tabs');
const servicesBtns = servicesTabs.querySelectorAll('.services__tab');
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