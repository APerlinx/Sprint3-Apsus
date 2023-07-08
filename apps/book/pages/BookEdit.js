import { bookService } from '../services/book.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'


export default {
    template: `

        <form @submit.prevent="save" class="book-edit">
            <h2>Edit a Book</h2>
            <input v-model="bookToEdit.title" type="text" placeholder="Enter title">
            <input v-model.number="bookToEdit.listPrice.amount" type="number" >
            <hr />
            <RouterLink to="/book">Cancel</RouterLink> 
            <button :disabled="!isValid">save</button>
        </form>
    `,
    data() {
        return {
            bookToEdit: bookService.getEmptybook()
        }
    },
    computed: {
        isValid() {
            return this.bookToEdit.title.length > 0
        }
    },
    created() {
        const { bookId } = this.$route.params
        if (!bookId) return
        bookService.get(bookId)
            .then(book => {
                this.bookToEdit = book
            })
            .catch(err => {
                showErrorMsg('Cannot load book for edit')
                this.$router.push('/book')
            })
    },
    methods: {
        save() {
            bookService.save(this.bookToEdit)
                .then(savedBook => {
                    showSuccessMsg('Book has bee updated')
                    this.$router.push('/book')
                })
                .catch(err => {
                    showErrorMsg('Cannot update book')
                })
        }
    } 
}