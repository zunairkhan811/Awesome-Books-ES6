import { DateTime } from './node_modules/luxon/src/luxon.js';

import {
  pageOne, pageTwo, pageThree, listLink, addLink, contactLink,
} from './modules/navigation_module.js';

import ui from './modules/ui_module.js';
import store from './modules/store_module.js';
import Book from './modules/book_module.js';

document.addEventListener('DOMContentLoaded', ui.displaybooks);

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    // eslint-disable-next-line no-alert
    alert('Please fill in all fields');
  } else {
    const book = new Book(title, author);

    ui.addbooktolist(book);

    store.addbook(book);

    ui.clearFields();
  }
});

document.querySelector('#book-addition').addEventListener('click', (e) => {
  ui.deletebook(e.target);
  store.removebook(
    e.target.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent,
  );
});

const date = document.getElementById('date');
const displayDate = () => {
  const dt = DateTime.now();
  date.innerHTML = dt.toLocaleString(DateTime.DATETIME_MED);
  setInterval(displayDate, 1000);
};

displayDate(date);

listLink.addEventListener('click', () => {
  pageOne.style.display = 'flex';
  pageTwo.style.display = 'none';
  pageThree.style.display = 'none';
});

addLink.addEventListener('click', () => {
  pageOne.style.display = 'none';
  pageTwo.style.display = 'flex';
  pageThree.style.display = 'none';
});

contactLink.addEventListener('click', () => {
  pageOne.style.display = 'none';
  pageTwo.style.display = 'none';
  pageThree.style.display = 'flex';
});
