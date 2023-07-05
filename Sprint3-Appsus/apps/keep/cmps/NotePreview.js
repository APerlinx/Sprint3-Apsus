import NoteTxt from './NoteTxt.js'

export default {
    props: ['note'],
    template: `
       <article class="note-preview">

    <component 
        :is="getComponentName(note.type)" 
        :note="note" />
    

    <section class="links">
      <!-- <RouterLink :to="'/note/' + note.id" class="details-link">Details</RouterLink>
      <RouterLink :to="'/note/edit/' + note.id" class="edit-link">Edit</RouterLink> -->
    </section>
  </article>
    `,
    computed: {
    },
    components: {
        NoteTxt,
      },
    
}