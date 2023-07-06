import { noteService } from '../services/note.service.js';

export default {
  emits: ['add-note'],
  template: `  
   <div class="add-note" contenteditable="true" role="textbox" @input="handleInput" ref="noteDiv">
    <!-- <button class="add-icon" title="Add Note"><i class="fas fa-plus"></i></button>
    <button class="delete-icon" title="Delete Note"><i class="fas fa-trash"></i></button>  -->
   </div>
   <button class="close-button" title="Close" @click="handleClose">
    <i class="fas fa-check"></i>
   </button>

    `,
   data() {
    return {
      showNoteText: true,
      noteText: '',
      
    };
  },
  methods: {
   handleClose() {
    const noteContent = this.$refs.noteDiv.innerText.trim()
    if (noteContent !== '') {
      this.$emit('add-note', noteContent)
    }
    this.$refs.noteDiv.innerText = '';
  },
    handleInput() {
      const content = this.$refs.noteDiv.innerText.trim()
      this.showNoteText = content.length === 0;
    },
    saveNote() {
      console.log('Saving note:', this.noteText);
    },
    handleBlur() {
      if (this.$refs.noteDiv.innerText.trim() === "") {
        this.showNoteText = true;
      }
    },
  },
};
