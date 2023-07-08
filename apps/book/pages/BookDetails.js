import { bookService } from '../services/book.service.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';

import AddReview from '../cmps/AddReview.js';
import ReviewList from '../cmps/ReviewList.js'


export default {
  template: `
    <section class="book-details" v-if="book">
      <h2>{{ book.title }}</h2>
      <img ref="bookImg" @error="setDefaultImg" :src="book.thumbnail" alt="Book's thumbnail"> 
      <h4>Author: {{ book.authors.join(',') }}</h4>
      <p>Categories: {{ book.categories.join(', ') }}</p>
      <p>Page count: {{ book.pageCount}} {{ pageCount }}</p>
      <p>Language: {{ book.language }}</p>
      <p>Published: {{ book.publishedDate }} {{ publishDate }}</p>
      <p>{{ book.desc }}</p>
      <h6>{{ onSale }}</h6>
      <h3><span :class="priceCheck">{{ book.listPrice.amount }}</span>{{ book.listPrice.currencyCode }}</h3>

      <ReviewList @remove="removeReview" :reviews="book.reviews"/>
      <AddReview @add-review="addReview"></AddReview>
      <div class="links">
      <RouterLink :to="'/book/' + book.nextBookId">Next book</RouterLink> |
      <RouterLink :to="'/book/' + book.prevBookId">Prev book</RouterLink> |
      <RouterLink to="/book">Back to List</RouterLink>
      </div>
    </section>
  `,
  data() {
    return {
      book: null,
    };
  },
  created() {
    this.loadBook();
  },
  computed: {
    onSale() {
      return this.book.listPrice.isOnSale ? 'This book is on sale!' : '';
    },
    pageCount() {
      return this.book.pageCount > 500
        ? 'Serious Reading'
        : this.book.pageCount > 200
        ? 'Descent Reading'
        : this.book.pageCount > 100
        ? 'Light Reading'
        : '';
    },
    publishDate() {
      const currentYear = new Date().getFullYear();
      const bookYear = this.book.publishedDate;
      return bookYear < currentYear - 10 ? 'Vintage' : 'New';
    },
    priceCheck() {
      const amount = this.book.listPrice.amount;
      return {
        expensive: amount > 150,
        cheap: amount < 20,
      };
    },
    bookId() {
      return this.$route.params.bookId;
    },
  },
  methods: {
    loadBook() {
      const { bookId } = this.$route.params;
      bookService
        .get(bookId)
        .then((book) => {
          this.book = book;
        })
        .catch((err) => {
          this.$router.push('/book');
        });
    },
    addReview(review) {
      bookService
        .addReview(this.book.id, review)
        .then((book) => (this.book = book));
    },
    removeReview(reviewId) {
      bookService
        .removeReview(this.book.id, reviewId)
        .then((book) => (this.book = book));
    },
    setDefaultImg() {
      this.$refs.bookImg.src = '../assets/img/default.jpeg';
    },
  },
  watch: {
    bookId() {
      this.loadBook();
    },
  },
  components: {
    AddReview,
    ReviewList,
  },
};
