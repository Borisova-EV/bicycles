'use strict';

const menu = document.querySelector('.main-navigation');
const menuButton = menu.querySelector('.main-navigation__button');
const page = document.querySelector('.page-body');
const header = page.querySelector('.page-header__content');
const form = document.querySelector('.form');
const inputTelephoneContainer = form.querySelector('.form__telephone');
const inputTelephone = inputTelephoneContainer.querySelector('input');
const inputNameContainer = form.querySelector('.form__name');
const inputName = inputNameContainer.querySelector('input');
const anchors = document.querySelectorAll('.main-navigation a')

let isStorageSupport = true;
let storageName = "";
let storageTelephone = "";

const onMenuButtonClick = () => menu.classList.toggle('main-navigation--closed');

function openCloseMenu() {
  header.classList.remove('page-header__content--nojs');
  menu.classList.remove('main-navigation--nojs');
  menuButton.addEventListener('click', function () {
    menu.classList.toggle('main-navigation--closed');
    menu.classList.toggle('main-navigation--opened');
    page.classList.toggle('page-body--opened-menu');
    const attribute = menu.classList.contains('main-navigation--opened') ? 'Закрыть меню' : 'Открыть меню';
    menuButton.setAttribute('aria-label', attribute);
  });
}

openCloseMenu();

try {
  storageName = localStorage.getItem("name");
} catch (err) {
  isStorageSupport = false;
}
try {
  storageTelephone = localStorage.getItem("telephone");
} catch (err) {
  isStorageSupport = false;
}

function submitForm() {
  form.addEventListener('submit', (evt) => {
    if (!inputTelephone.value || !inputName.value) {
      evt.preventDefault();
    } else if (isStorageSupport) {
      localStorage.setItem("telephone", inputTelephone.value);
      localStorage.setItem("name", inputName.value);
    }
  })
}

function matchingPatternTelephone() {
  const telephoneTemplate = /^(\+)?[0-9]+$/;
  return telephoneTemplate.test(inputTelephone.value);
};

function validationInputTelephone() {
  if (!matchingPatternTelephone()) {
    inputTelephoneContainer.classList.add('form__telephone--error');
    inputTelephone.setCustomValidity('Введите номер в правильном формате');
  } else {
    inputTelephone.setCustomValidity('');
    inputTelephoneContainer.classList.remove('form__telephone--error');
  };
}

function editingForm() {
  inputTelephone.addEventListener('input', function () {
    validationInputTelephone()
  })
}

editingForm();
submitForm();


function addSmoothScroll() {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href')

      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    })
  }
}

addSmoothScroll();
