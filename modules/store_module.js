export default class store {
    static getbooks = () => {
      let books;
      if (localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
      return books;
    }

    static addbook = (book) => {
      const books = store.getbooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }

    static removebook = (title) => {
      const books = store.getbooks();
      books.forEach((book, index) => {
        if (book.title === title) {
          books.splice(index, 1);
        }
      });
      localStorage.setItem('books', JSON.stringify(books));
    }
}