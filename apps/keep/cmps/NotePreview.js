import NoteTxt from './NoteTxt.js';
import NoteTodos from './NoteTodos.js';
import NoteImg from './NoteImg.js';
import NoteVideo from './NoteVideo.js';

import LabelAdd from './LabelAdd.js';
import BgAdd from './BgAdd.js';

export default {
  emits: ['toggle-pin', 'trash'],
  props: ['note'],
  template: `
    <article class="note-preview" :style="{ backgroundColor: note.bgColor }">

        <i v-if="!isTrashed" class="material-icons unpinned-icon" @click="togglePin">push_pin</i> 
        
        <TransitionGroup name="list" tag="ul">
          <li v-for="label in note.labels" :key="label" class="clean-list note-label" :class="labelClasses[label]">
            {{label}}
          </li>
        </TransitionGroup>

        <component :is="getComponentName(note.type)" :note="note" />

      <div class="tool-tip">
         <i v-if="!isTrashed" class="material-icons" title="add labels" @click="showLabelModal = true">label</i>
         <i v-if="!isTrashed" class="material-icons" title="background options" @click="showColorPicker = !showColorPicker">palette</i>
         <BgAdd
           v-if="showColorPicker"
           :note="note"
           @bg-color-change="updateBgColor"
         />
         <i v-if="isTrashed" class="material-icons" title="delete permanently" @click="deletePermanently(note.id)">delete_forever</i>
         <i class="material-icons" :title="isTrashed ? 'restore' : 'delete'" @click="isTrashed ? restorehNote(note.id) : trashNote(note.id)">
           {{ isTrashed ? 'restore' : 'delete' }}
         </i>
         <i v-if="!isTrashed" class="material-icons" title="archive" @click="archiveNote(note.id)">archive</i> 
         <i v-if="!isTrashed" class="material-icons" title="email note">email</i> 
      </div>

     </article>

     
     
     <div class="modal-overlay" v-if="showLabelModal" @click="closeModal"></div>
     <LabelAdd
       v-if="showLabelModal"
       :note="note"
       :position="labelModalPosition"
       @close-modal="closeModal"
       @labels="updateNoteLabels"
      />

    <!-- <section class="links">
      <RouterLink :to="'/note/' + note.id" class="details-link">Details</RouterLink>
      <RouterLink :to="'/note/edit/' + note.id" class="edit-link">Edit</RouterLink>
    </section> -->
    `,
  data() {
    return {
      showLabelModal: false,
      labelModalPosition: { x: 0, y: 0 },
      label: '',
      showColorPicker: false,
    };
  },
  computed: {
    labelClasses() {
      const labelClassMap = {
        Critical: 'label-critical',
        Family: 'label-family',
        Work: 'label-work',
        Friends: 'label-friends',
        Spam: 'label-spam',
        Memories: 'label-memories',
        Romantic: 'label-romantic',
      };
      return labelClassMap;
    },
    isTrashed() {
      return this.note.isTrashed
    }
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
    trashNote(noteId) {
      this.$emit('trash', noteId);
    },
    togglePin() {
      this.note.isPinned = !this.note.isPinned;
      this.$emit('toggle-pin', this.note);
    },
    closeModal() {
      this.showLabelModal = false;
    },
    updateNoteLabels({ noteLabels, note }) {
      note.labels = noteLabels;
    },
    archiveNote(noteId) {
      this.$eventBus.emit('selected-note-archive', noteId);
    },
    deletePermanently(noteId) {
      this.$eventBus.emit('remove-permanetly', noteId);
    },
    restorehNote(noteId) {
      this.$eventBus.emit('restore-note', noteId);
    }
  },
  components: {
    NoteTxt,
    NoteTodos,
    NoteImg,
    NoteVideo,
    LabelAdd,
    BgAdd,
  },
};
