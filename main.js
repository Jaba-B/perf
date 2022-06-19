/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-mixed-operators */

import './styles/style.css';

const form = document.querySelector('added-section__email-box');
const btn = document.getElementById('subscribeBtn');
const h2 = document.getElementById('h2');
btn.addEventListener('click', () => {
  const input = document.getElementById('email-input');
  const validEmailEndings = ['gmail.com', 'outlook.com', 'yandex.ru'];
  const email = input.value;
  const ending = email.substring(email.indexOf('@') + 1);
  const start = email.substring(0, email.indexOf('@'));
  if (ending === validEmailEndings[0] && start.length > 0
            || ending === validEmailEndings[1] && start.length > 0
            || ending === validEmailEndings[2] && start.length > 0) {
    localStorage.setItem('email', email);
    if (btn.innerHTML == 'SUBSCRIBE') {
      input.style.display = 'none';
      btn.style.height = '42px';
      btn.innerHTML = 'UNSUBSCRIBE';
      form.style.justifyContent = 'center';
    } else {
      input.style.display = 'inline-block';
      btn.style.height = '42px';
      btn.innerHTML = 'SUBSCRIBE';
      form.style.justifyContent = 'space-between';
      localStorage.removeItem('email');
      input.value = '';
    }
  } else {
    alert('false');
  }
  const emailInput = document.querySelector('added-section__email-btn');
  emailInput.style.display = 'none';
}, false);

const advanced = () => {
  btn.textContent = 'Subscribe to Advanced Program';
  h2.textContent = 'Join Our Advanced Program';
};

const remove = () => {
  const parent = document.getElementById('app-container');
  const child = parent.children[4];
  child.remove();
};

// advanced();
// remove();

