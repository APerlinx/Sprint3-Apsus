export default {
    props: ['book'],
    template: `
        <article class="book-preview">
             <section class="links">
            <RouterLink :to="'/book/' + book.id" class="details-link">Details</RouterLink>
            <RouterLink :to="'/book/edit/' + book.id" class="edit-link">Edit</RouterLink>
            </section>
            <img :src="book.thumbnail" class="preview-img">
            <h2 class="preview-title">{{ book.title}}</h2>
            <p>Rating stars here</p>
            <h3 class="preview-price"><span>$</span>{{ book.listPrice.amount }}</h3>
        </article>
    `,
    computed: {
        currency() { // TODO: IMPLEMENT
            let curr = ''
            const type = this.book.listPrice.currencyCode
            //check for shorter way maybe intl func
            switch (type) {
                case 'EUR':
                    curr = '€'
                    break
                case 'USD':
                    curr = '$'
                    break
                case 'ILS':
                    curr = '₪'
                    break
                default:
                    curr = '$'
            }
            return curr
        },
        price() { return this.book.listPrice.amount },

    }
}