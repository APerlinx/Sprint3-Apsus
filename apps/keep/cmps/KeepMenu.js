import { noteService } from '../services/note.service.js';

export default {
  template: `  
         <section class="keep-app-menu">
         <i class="mdi mdi-lightbulb-on-outline" title="Notes" @click="displayNotes"></i> 
         <i class="mdi mdi-bell-outline" title="Nothing here yet );"></i> 
         <i class="mdi mdi-pencil" title="Edit labels"></i> 
         <i class="mdi mdi-archive" title="Archive" @click=displayArchived></i> 
         <i class="mdi mdi-trash-can-outline" title="Trash" @click=displayTrashed></i> 
        </section>  
    `,
  methods: {
    displayNotes() {
      this.$emit('display-notes');
    },
    displayArchived() {
      this.$emit('display-archived');
    },
    displayTrashed() {
      this.$emit('display-trash');
    }
  },
};
