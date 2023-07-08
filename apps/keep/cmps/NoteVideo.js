export default {
    props: ['note', 'showTitle'],
    template: `
        <article class="note-video">
            <h2 v-if="showTitle">{{ note.info.title }}</h2>
            <iframe :src="note.info.url" frameborder="0" width="200" height="200"></iframe>
        </article>
    `,
    computed: {
    }
}