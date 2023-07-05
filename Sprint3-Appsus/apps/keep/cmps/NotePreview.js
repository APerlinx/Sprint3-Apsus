export default {
    props: ['note'],
    template: `
        <article class="note-preview">
            <h1>{{note.info.title}}</h1>
            <p>Txt</p>
        </article>
             <section class="links">
            <!-- <RouterLink :to="'/note/' + note.id" class="details-link">Details</RouterLink>
            <RouterLink :to="'/note/edit/' + note.id" class="edit-link">Edit</RouterLink> -->
            </section>
    `,
    computed: {
    }
}