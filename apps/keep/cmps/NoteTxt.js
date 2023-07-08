export default {
    props: ['note', 'showTitle'],
    template: `
        <article class="note-txt">
            <h2 v-if="showTitle">{{ note.info.title }}</h2>
            <p>{{ note.info.txt }}</p>
        </article>
    `,
}