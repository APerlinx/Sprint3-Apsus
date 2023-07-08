import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js'

import booksData from '../data/book-data.js'

const PAGE_SIZE = 5;
const BOOK_KEY = 'bookDB';

var gFilterBy = { title: '', price: 0 };
var gSortBy = { price: 0 };
var gPageIdx;

_createbooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptybook,
  getNextbookId,
  getFilterBy,
  setFilterBy,
  getbookCountBySpeedMap,
  addReview,
  removeReview,
  addGoogleBook,
};
window.bookService = bookService;

function query() {
  return storageService.query(BOOK_KEY).then((books) => {
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, 'i');
      books = books.filter((book) => regex.test(book.title));
    }
    if (gPageIdx !== undefined) {
      const startIdx = gPageIdx * PAGE_SIZE;
      books = books.slice(startIdx, startIdx + PAGE_SIZE);
    }
    if (gSortBy.price !== undefined) {
      books.sort((c1, c2) => (c1.price - c2.price) * gSortBy.price);
    } else if (gSortBy.title !== undefined) {
      books.sort((c1, c2) => c1.title.localeCompare(c2.title) * gSortBy.title);
    }

    return books;
  });
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
      .then(book => _setNextPrevBookId(book))
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

function getEmptybook(title = '' , amount = null) {
  return {
    id: '',
    title,
    subtitle: '',
    authors: [],
    publishedDate: '',
    description: '',
    pageCount: 0,
    categories: [],
    thumbnail: '',
    language: '',
    listPrice: {
      amount,
      currencyCode: '',
      isOnSale: false
    }
  };
}

function addGoogleBook(book) {
  if (book.id) {
    return console.log('Book already exist in DB')
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getFilterBy() {
  return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price;
  return gFilterBy;
}

function getNextbookId(bookId) {
  return storageService.query(BOOK_KEY).then((books) => {
    var idx = books.findIndex((book) => book.id === bookId);
    if (idx === books.length - 1) idx = -1;
    return books[idx + 1].id;
  });
}

function getbookCountBySpeedMap() {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookCountBySpeedMap = books.reduce(
      (map, book) => {
        if (book.price < 120) map.cheap++;
        else if (book.price < 200) map.normal++;
        else map.expensive++;
        return map;
      },
      { cheap: 0, normal: 0, expensive: 0 }
    );
    return bookCountBySpeedMap;
  });
}


function addReview(bookId, review) {
  return get(bookId)
      .then(book => {
          if (!book.reviews) book.reviews = []
          review.id = utilService.makeId()
          book.reviews.push(review)
          return save(book)
      })
}

function removeReview(bookId, reviewId) {
  return get(bookId)
      .then(book => {
          const idx = book.reviews.findIndex(review => review.id === reviewId)
          book.reviews.splice(idx, 1)
          return save(book)
      })
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY)
      .then(books => {
          const bookIdx = books.findIndex(currBook => currBook.id === book.id)
          book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
          book.prevBookId = books[bookIdx - 1]
              ? books[bookIdx - 1].id
              : books[books.length - 1].id
          return book
      })
}

function _createbooks() {
  let books = utilService.loadFromStorage(BOOK_KEY);
  if (!books || !books.length) {
    books = booksData;
    utilService.saveToStorage(BOOK_KEY, books);
  }
}

function _createbook(title) {
  const book = getEmptybook(title);
  book.id = utilService.makeId();
  return book;
}

function _createDemoBooks() {
    const bookTitle = ['Book1', 'Book2', 'Book3']
    const bookDescs = ['placerat nisi sodales suscipit tellus', 'placerat sodales suscipit tellus', 'placerat nisi suscipit']
    const thumbnail = 'http://ca.org/books-photos/20.jpg'
    const listPrice = [
    {amount:10,currencyCode:'EUR',isOnSale:false},
    {amount:15,currencyCode:'EUR',isOnSale:false},
    {amount:20,currencyCode:'EUR',isOnSale:false}
]
    
    const books = bookTitle.map((bookTitle, i) => {
        const book = _createbook(bookTitle)
        book.desc = bookDescs[i]
        book.thumbnail = thumbnail[i]
        book.listPrice = listPrice[i]
        return book
    })

    utilService.saveToStorage(BOOK_KEY, books)
}