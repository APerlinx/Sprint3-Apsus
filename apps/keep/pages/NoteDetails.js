import NoteTxt from '../cmps/NoteTxt.js'
import NoteTodos from '../cmps/NoteTodos.js';
import NoteImg from '../cmps/NoteImg.js';
import NoteVideo from '../cmps/NoteVideo.js';

export default {
  props: ['note'],
  template: `

<div class="modal-overlay" @click="closeNote">
    <div class="note-dialog">
      <h2 v-if="note-dialog-title" class="note-dialog-title">{{ note.title }}</h2>
      <component :is="getComponentName(note.type)" :note="note" />
      <button class="note-dialog-close-btn" @click="closeNote">Close</button>
    </div>
  </div>

    `,
    data() {
        return {
          dialogOpen: false,
        };
      },
      methods: {
        getComponentName(type) {
          const componentMap = {
            NoteTxt,
            NoteTodos,
            NoteImg,
            NoteVideo,
          };
          return componentMap[type] || 'div';
        },
        closeNote() {
            this.$emit('close-note');
          },
      },
      components: {
        NoteTxt,
        NoteTodos,
        NoteImg,
        NoteVideo,
    }  
}
