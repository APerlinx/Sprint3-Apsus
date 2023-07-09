export default {
    props: ['note', 'showTitle'],
    template: `
        <article class="note-img">
            <h3 v-if="showTitle">{{ note.info.title }}</h3>
            <img :src="note.info.url" alt="Note image" class="note-img">
        </article>
    `,
}