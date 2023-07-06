export default {
    props: ['note'],
    template: `
        <article class="note-video">
            <iframe :src="note.info.url" frameborder="0" width="200" height="200"></iframe>
            <h1>{{ note.info.title }}</h1>
        </article>
    `,
    computed: {
    }
}