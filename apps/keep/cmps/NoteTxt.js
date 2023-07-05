export default {
    props: ['note'],
    template: `
        <article class="note-txt">
        <h2>{{ note.info.title }}</h2>
            <p>{{ note.info.txt }}</p>
        </article>
    `,
    computed: {
        
    }
}