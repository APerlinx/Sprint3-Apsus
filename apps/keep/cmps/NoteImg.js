export default {
    props: ['note'],
    template: `
        <article class="note-img">
            <p>{{note.info.title}}</p>
            <img :src="note.info.url" alt="Note image" class="note-img">
        </article>
    `,
    computed: {
    }
}