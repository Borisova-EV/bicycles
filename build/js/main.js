'use strict';

const menu = document.querySelector('.main-navigation');
const menuButton = menu.querySelector('.main-navigation__button');
const form = document.querySelector('.form');
const inputFields = form.querySelectorAll('input');
const inputTelephoneContainer = form.querySelector('.form__telephone');
const inputNameContainer = form.querySelector('.form__name');
const anchors = document.querySelectorAll('.main-navigation a')

let isStorageSupport = true;
let storageName = "";
let storageTelephone = "";

const onMenuButtonClick = () => menu.classList.toggle('main-navigation--closed');

function openCloseMenu() {
  menu.classList.remove('main-navigation--nojs');
  menuButton.addEventListener('click', function () {
    menu.classList.toggle('main-navigation--closed');
    menu.classList.toggle('main-navigation--opened');
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
  form.addEventListener('submit', () => {
    const inputName = evt.target.querySelector('#name');
    const inputTelephone = evt.target.querySelector('#telephone');
    if (inputTelephone.value && inputName.value) {
      if (isStorageSupport) {
        localStorage.setItem("telephone", inputTelephone.value);
        localStorage.setItem("name", inputName.value);
      };
    }
  })
}

function editingForm() {
  inputFields.forEach((input) => {
    input.addEventListener('input', function (evt) {
      console.log(evt.target);
      if (evt.target.matches('#telephone')) {
        validationInputTelephone(evt.target)
      }
    })
  })
}

const matchingPatternTelephone = (input) => {
  const telephoneTemplate =  /^(\+7)+([0-9]){10}$/;
  return telephoneTemplate.test(input.value);
};

function validationInputTelephone(inputTelephone) {
  if (inputTelephone.value === 0 || !matchingPatternTelephone(inputTelephone)) {
    inputTelephoneContainer.classList.add('form__telephone--error');
    inputTelephone.setCustomValidity('Введите номер в правильном формате');
  } else {
    inputTelephone.setCustomValidity('');
    inputTelephoneContainer.classList.remove('form__telephone--error');
  };
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
