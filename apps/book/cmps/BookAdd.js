import { bookService } from '../services/book.service.js'
import { googleBookService }  from '../services/googleBook.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {
  template: `
     <section class="add-book">
      <form @submit.prevent="searchBooks">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search here"
          class="add-book-input" />
        <button type="submit">Search</button>
      </form>
      <ul>
        <li v-for="book in books" :key="book.id">{{ book.title }} 
          <span @click="addBook(book)" class="add-google-book">&#43;</span> </li>
      </ul>
      <RouterLink to="/book">Back to list</RouterLink>
    </section>
    `,
  data() {
    return {
      searchTerm: '',
      books: [],
      debouncedSearch: null,
    };
  },
  mounted() {
    this.debouncedSearch = _.debounce(this.fetchBooks, 300)
  },
  methods: {
    searchBooks() {
        this.debouncedSearch(this.searchTerm)
    },
    fetchBooks(searchTerm) {
        googleBookService
            .query(searchTerm)
            .then(books => {
                this.books = books
            })
            .catch((error) => {
                console.error('Error fetching books:', error);
                this.books = [];
              })
    },
    addBook(book) {
      console.log(book)
        const newBook = {
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            authors: book.authors || ['Unknown'],
            publishedDate: book.publishedDate,
            description: book.description,
            pageCount: book.pageCount,
            language: book.language,
            thumbnail: book.imageLinks.thumbnail,
            categories: book.categories,
            listPrice: {
              amount: 50,
              currencyCode: "US",
              isOnSale: false,
            }
        }
        bookService.save(newBook)
        .then(savedBook => {
            showSuccessMsg('Book saved')
        })
        .catch(err => {
            showErrorMsg('Cannot save book')
        })
    }
  },
};
