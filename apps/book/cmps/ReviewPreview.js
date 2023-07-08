export default {
    props: ['review'],
    template: `
        <article class="review-preview">
            <pre>{{ review }}</pre>
        </article>
    `,
}