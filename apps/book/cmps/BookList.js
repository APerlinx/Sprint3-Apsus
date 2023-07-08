import BookPreview from './BookPreview.js'

export default {
    props: {
        books: {
          type: Array,
          required: true,
          default: [],
          validator: function(value) {
            return value.length >= 0;
          }
        }
    },
    template: `
        <section class="book-list">
            <ul>
                <li v-for="book in books" :key="book.id">
                
                        
             
                    <BookPreview :book="book" class="book-preview"/>
                    <button @click="onRemoveBook(book.id)" class="remove-btn clean-btn">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemoveBook(bookId) {
            this.$emit('remove',bookId)
        },
    },
    components: {
        BookPreview,
    }
}