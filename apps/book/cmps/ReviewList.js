import ReviewPreview from './ReviewPreview.js'

export default {
    props: ['reviews'],
    template: `
        <section class="review-list">
            <ul>
                <li v-for="review in reviews">
                    <ReviewPreview :review="review" />
                    <button @click="onRemoveReview(review.id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemoveReview(reviewId) {
            this.$emit('remove', reviewId)
        }
    },
    components: {
        ReviewPreview,
    }
}