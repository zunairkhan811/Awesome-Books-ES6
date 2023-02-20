import store from './store_module.js';

export default class ui {
    static displaybooks = () => {
      const books = store.getbooks();
      books.forEach((book) => ui.addbooktolist(book));
    }

    static addbooktolist = (book) => {
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

    static deletebook = (el) => {
      if (el.classList.contains('remove-btn')) {
        el.parentElement.remove();
      }
    }

    static clearFields = () => {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
    }
}