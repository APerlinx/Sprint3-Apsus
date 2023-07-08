import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import BookFilter from '../cmps/BookFilter.js'
import BookList from '../cmps/BookList.js'


export default {
  template: `
        <section class="book-index">
            <RouterLink to="/book/add">Add book</RouterLink>
            <BookFilter @filter="setFilterBy" />
            <BookList
             v-if="books"
             :books="filteredBooks"
             @remove="removeSelected" />
        </section>
    `,
  data() {
    return {
      books: [],
      filterBy: null,
    };
  },
   computed: {
    filteredBooks() {
      if (!this.filterBy) return this.books

      const titleRegex = new RegExp(this.filterBy.title, 'i')
      const publishedRegex = new RegExp(`^${this.filterBy.published}$`);
      const authorRegex = new RegExp(Array.isArray(this.filterBy.authors) ? this.filterBy.authors.join('|') : '', 'i');

      if (!this.filterBy.title && !this.filterBy.price && this.filterBy.isOnSale === null && !this.filterBy.authors && !this.filterBy.published) {
        return this.books
      } else {
        return this.books.filter((book) => {

          const titleMatch = !this.filterBy.title || titleRegex.test(book.title)
          const authorMatch = !this.filterBy.authors || authorRegex.test(book.authors.join(','))

          const publishedMatch = !this.filterBy.published || publishedRegex.test(book.publishedDate);
 
          const priceMatch =
            !this.filterBy.price ||
            (this.filterBy.price === 'allPrices' ||
              Number(book.listPrice.amount) <= Number(this.filterBy.price))

          const isOnSaleMatch = this.filterBy.isOnSale === null || book.listPrice.isOnSale === this.filterBy.isOnSale

          return titleMatch && priceMatch && isOnSaleMatch && publishedMatch && authorMatch
        })
      }
    }
  },
    created() {
    bookService
      .query()
      .then(books => this.books = books)
      .catch((error) => console.error('Error fetching books:', error))
  },
  methods: {
    removeSelected(bookId) {
      bookService.remove(bookId)
        .then(() => {
         const idx = this.books.findIndex((book) => book.id === bookId)
          this.books.splice(idx, 1)
          showSuccessMsg('Book removed')
        })
        .catch(err => {
          showErrorMsg('Cannot remove book')
        })
    },

    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  components: {
    BookFilter,
    BookList,
  },
};
