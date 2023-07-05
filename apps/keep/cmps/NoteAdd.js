import { noteService } from '../services/note.service.js';

export default {
  template: `  
         <div class="add-note" contenteditable="true" role="textbox">
             <button class="add-icon" title="Add Note"><i class="fas fa-plus"></i></button>
             <button class="delete-icon" title="Delete Note"><i class="fas fa-trash"></i></button>
        </div>  
       
    `,
  computed: {},
};
