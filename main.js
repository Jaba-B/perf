/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-mixed-operators */

import './styles/loadedpage.css';
import './styles/style.css';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .invisible { display: none }
    button {
      padding: 0px 0px;
      border: 0px;
      margin 0px 0px;
      background: none;
    }
    .app-section
  </style>
  <div> <slot name="div" /> </div>
  <h1> <slot name="title" /> </h1>
  <h2> <slot name="subtitle" /> </h2>
  <h2> <slot name="h3" /> </h2>
  <article> <slot name="article" /> </article>
  <button> <slot name="btn" /> </button>
  <form> <slot name="form" /> </form>
`;
class WebsiteSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('website-section', WebsiteSection);

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
    // eslint-disable-next-line no-alert
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
