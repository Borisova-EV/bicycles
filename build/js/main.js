'use strict';

const menu = document.querySelector('.main-navigation');
const menuButton = menu.querySelector('.main-navigation__button');

const onMenuButtonClick = () => menu.classList.toggle('main-navigation--closed');

function openCloseMenu() {
  menu.classList.remove('main-navigation--nojs');
  console.log(1);
  menuButton.addEventListener('click', function () {
    menu.classList.toggle('main-navigation--closed');
    menu.classList.toggle('main-navigation--opened');
    const attribute = menu.classList.contains('main-navigation--opened') ? 'Закрыть меню' : 'Открыть меню';
    menuButton.setAttribute('aria-label', attribute);
    console.log(5);
  });
  console.log(2);
}

openCloseMenu();
