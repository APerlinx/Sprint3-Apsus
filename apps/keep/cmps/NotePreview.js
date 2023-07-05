import NoteTxt from './NoteTxt.js';
import NoteTodos from './NoteTodos.js';
import NoteImg from './NoteImg.js';

export default {
  props: ['note'],
  template: `
       <article class="note-preview">
    <component :is="getComponentName(note.type)" :note="note" />
    <div class="tool-tip">
    <i class="material-icons" title="reminder">add_alert</i>
    <i class="material-icons" title="background options">palette</i> 
    <i class="material-icons" title="delete">delete</i> 
    <i class="material-icons" title="archive">archive</i> 
    <i class="material-icons" title="email note">email</i> 
  </div>
  
  </article>
    <!-- <section class="links">
      <RouterLink :to="'/note/' + note.id" class="details-link">Details</RouterLink>
      <RouterLink :to="'/note/edit/' + note.id" class="edit-link">Edit</RouterLink>
    </section> -->
    `,
  computed: {},
  methods: {
    getComponentName(type) {
      const componentMap = {
        NoteTxt,
        NoteTodos,
        NoteImg,
      };

      return componentMap[type] || 'div'
    },
  },
  components: {
    NoteTxt,
    NoteTodos,
    NoteImg,
  },
};
