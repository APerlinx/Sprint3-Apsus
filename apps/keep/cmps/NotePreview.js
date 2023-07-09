import NoteTxt from './NoteTxt.js';
import NoteTodos from './NoteTodos.js';
import NoteImg from './NoteImg.js';
import NoteVideo from './NoteVideo.js';
import NoteDetails from '../pages/NoteDetails.js';

import LabelAdd from './LabelAdd.js';
import BgAdd from './BgAdd.js';

export default {
  emits: ['toggle-pin', 'trash'],
  props: ['note','labels'],
  template: `
  <div>
    <article class="note-preview" :style="{ backgroundColor: note.bgColor }" @click="openNote">
      <i v-if="!isTrashed" class="material-icons unpinned-icon" @click.stop="togglePin">push_pin</i>
      <TransitionGroup name="list" tag="ul">
        <li v-for="label in note.labels" :key="label" class="clean-list note-label" :class="labelClasses[label]">
          {{ label }}
        </li>
      </TransitionGroup>
      <component :is="getComponentName(note.type)" :note="note" :showTitle="true" />
      <div class="tool-tip">
        <i v-if="!isTrashed" class="material-icons" title="add labels" @click.stop="showLabelModal = true">label</i>
        <i v-if="!isTrashed" class="material-icons" title="background options" @click.stop="showColorPicker = !showColorPicker">palette</i>
        <BgAdd v-if="showColorPicker" :note="note" @bg-color-change="updateBgColor" />
        <i v-if="isTrashed" class="material-icons" title="delete permanently" @click.stop="deletePermanently(note.id)">delete_forever</i>
        <i class="material-icons" :title="isTrashed ? 'restore' : 'delete'" @click.stop="isTrashed ? restoreNote(note.id) : trashNote(note.id)">
          {{ isTrashed ? 'restore' : 'delete' }}
        </i>
        <i v-if="!isTrashed" class="material-icons" title="Archive" @click.stop="archiveNote(note.id)">archive</i>
        <i v-if="!isTrashed" class="material-icons" title="email note" @click.stop="openEmail">email</i>
      </div>
    </article>

    <div class="modal-overlay" v-if="showLabelModal" @click="closeModal"></div>
        <LabelAdd 
        v-if="showLabelModal" 
        :note="note"
        :labels="labels" 
        :position="labelModalPosition"
        @close-modal="closeModal" 
        @selected-labels="updateNoteLabels" />
        
        <NoteDetails 
        v-if="dialogOpen" 
        :note="note" 
        @close-note="closeNote"
        @toggle-pin="togglePin" />
    </div>
    `,
  data() {
    return {
      showLabelModal: false,
      labelModalPosition: { x: 0, y: 0 },
      label: '',
      showColorPicker: false,
      dialogOpen: false,
      selectedNote: null,
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
      return this.note.isTrashed;
    },
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
    updateNoteContent(event) {
      this.selectedNote.info.txt = event.target.innerText
      this.$eventBus.emit('note-content-updated', this.selectedNote)
    },
    trashNote(noteId) {
      this.$emit('trash', noteId)
    },
    togglePin() {
      this.note.isPinned = !this.note.isPinned
      this.$emit('toggle-pin', this.note)
    },
    updateSelectedLabels(note) {
      
    },
    closeModal() {
      this.showLabelModal = false;
    },
    updateNoteLabels(noteLabels) {
      this.$eventBus.emit('selected-labels-updated', { selectedLabels: noteLabels, note: this.selectedNote })
    },
    archiveNote(noteId) {
      this.$eventBus.emit('selected-note-archive', noteId)
    },
    deletePermanently(noteId) {
      this.$eventBus.emit('remove-permanently', noteId)
    },
    restoreNote(noteId) {
      this.$eventBus.emit('restore-note', noteId)
    },
    openNote() {
      this.selectedNote = this.note
      this.dialogOpen = true
    },
    closeNote() {
      this.dialogOpen = false
    },
    openEmail() {
      const subject = this.note.info.title
      let body = ''
    
      if (this.note.type === 'NoteTxt') {
        body = this.note.info.txt
      } else if (this.note.type === 'NoteTodos') {
        body = this.note.info.todos.map(todo => '• ' + todo.txt).join('\n')
      } else if (this.note.type === 'NoteImg') {
        body = this.note.info.url
      } else if (this.note.type === 'NoteVideo') {
        body = this.note.info.url
      }
    
      this.$router.push({
        name: 'MailCompose',
        query: { subject, body: encodeURIComponent(body) },
      });
      
    }    
  },
  components: {
    NoteTxt,
    NoteTodos,
    NoteImg,
    NoteVideo,
    LabelAdd,
    BgAdd,
    NoteDetails,
  },
};
