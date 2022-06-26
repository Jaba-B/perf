/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */

import './styles/loadedpage.css';
import './styles/style.css';
import { community } from './community.js';

window.addEventListener('load', community());

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

// Web-worker task
function sendRequest(info) {
  const xhr = new XMLHttpRequest();
  xhr.open('post', 'api/analytics/user');
  xhr.responseType = 'json';
  xhr.setRequestHeader('Content-Type', 'Application/json');
  xhr.onload = () => {
    const data = xhr.response;
    if (xhr.status == 422) {
      window.alert(JSON.stringify(data));
    } else {
      console.log(data);
    }
  };
  xhr.onerror = (error) => { console.log(error); };
  xhr.send(JSON.stringify({ info }));
  console.log(`${info} is sent`);
}

// const btns = document.getElementsByClassName('app-section__button');
// const worker = new Worker('./worker.js');

// for (let i = 0; i < btns.length; i++) {
//   // eslint-disable-next-line no-loop-func
//   btns[i].addEventListener('click', function () {
//     worker.postMessage(this.textContent);
//     console.log(this.textContent);
//     worker.onmessage = (e) => {
//       console.log(e.data);
//       sendRequest(e.data);
//     };
//   });
// }

if (window.Worker) {
  const btns = document.getElementsByClassName('app-section__button');
  const input = document.getElementById('email-input');
  const url = new URL('./worker.js', import.meta.url);
  const worker = new Worker(url);

  for (let i = 0; i < btns.length; i++) {
    // eslint-disable-next-line no-loop-func
    btns[i].addEventListener('click', function () {
      worker.postMessage(this.textContent);
      console.log(this.textContent);
      worker.onmessage = (e) => {
        sendRequest(e.data);
      };
    });
  }
  input.addEventListener('click', function () {
    worker.postMessage(this.textContent);
    console.log(this.textContent);
    worker.onmessage = (e) => {
      sendRequest(e.data);
    };
  });
}

// sending email
// const form = document.querySelector('added-section__email-box');
// const btn = document.getElementById('subscribeBtn');
// const h2 = document.getElementById('h2');
// btn.addEventListener('click', () => {
//   const input = document.getElementById('email-input');
//   const validEmailEndings = ['gmail.com', 'outlook.com', 'yandex.ru'];
//   const email = input.value;
//   const ending = email.substring(email.indexOf('@') + 1);
//   const start = email.substring(0, email.indexOf('@'));
//   if (ending === validEmailEndings[0] && start.length > 0
//             || ending === validEmailEndings[1] && start.length > 0
//             || ending === validEmailEndings[2] && start.length > 0) {
//     localStorage.setItem('email', email);
//     clicksToWorker();
//     if (btn.innerHTML == 'SUBSCRIBE') {
//       input.style.display = 'none';
//       btn.style.height = '42px';
//       btn.innerHTML = 'UNSUBSCRIBE';
//       // form.style.justifyContent = 'center';
//     } else {
//       input.style.display = 'inline-block';
//       btn.style.height = '42px';
//       btn.innerHTML = 'SUBSCRIBE';
//       // form.style.justifyContent = 'space-between';
//       localStorage.removeItem('email');
//       input.value = '';
//     }
//   } else {
//     // eslint-disable-next-line no-alert
//     alert('false');
//   }
//   const emailInput = document.querySelector('added-section__email-btn');
//   // emailInput.style.display = 'none';
// }, false);

// const advanced = () => {
//   btn.textContent = 'Subscribe to Advanced Program';
//   h2.textContent = 'Join Our Advanced Program';
// };

// const remove = () => {
//   const parent = document.getElementById('app-container');
//   const child = parent.children[4];
//   child.remove();
// };

// advanced();
// remove();

function perf(type, name, data) {
  console.log(`${ type }: ${ name } | ${ data?data:"" }`)
}

window.addEventListener("load", () => {
  //performacne of server
  const entries = performance.getEntriesByType("measure");
  entries.forEach( entry => {
    perf("mark", entry.name, entry.duration); // community performance
  });

  const navEntries = performance.getEntriesByType("navigation");
  navEntries.forEach( entry => {
    const ttfb = entry.responseStart-entry.fetchStart;
    perf("navigation", "load-page", entry.responseStart-entry.fetchStart)
  })
})