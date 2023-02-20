/* eslint-disable no-alert */
/* eslint-disable comma-dangle */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-use-before-define */

import { DateTime } from './node_modules/luxon/src/luxon.js';

import {
  pageOne, pageTwo, pageThree, listLink, addLink, contactLink
} from './modules/module1.js';

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class ui {
  static displaybooks() {
    const books = store.getbooks();
    books.forEach((book) => ui.addbooktolist(book));
  }

  static addbooktolist(book) {
    const list = document.querySelector('#book-addition');
    const div = document.createElement('div');
    div.innerHTML = `
          <p>${book.title}</p>
          <p>by</p>
          <p>${book.author}</p>
          <Button class="remove-btn">Remove</Button>
          `;
    list.appendChild(div);
  }

  static deletebook(el) {
    if (el.classList.contains('remove-btn')) {
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
}

class store {
  static getbooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addbook(book) {
    const books = store.getbooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removebook(title) {
    const books = store.getbooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', ui.displaybooks);

document.querySelector('#form').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title === '' || author === '') {
    alert('Please fill in all fields');
  } else {
    const book = new Book(title, author);
    // console.log(book);

    ui.addbooktolist(book);

    store.addbook(book);

    ui.clearFields();
  }
});

document.querySelector('#book-addition').addEventListener('click', (e) => {
  ui.deletebook(e.target);
  store.removebook(
    e.target.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
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
