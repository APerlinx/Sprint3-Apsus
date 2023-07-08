import NoteTxt from '../cmps/NoteTxt.js';
import NoteTodos from '../cmps/NoteTodos.js';
import NoteImg from '../cmps/NoteImg.js';
import NoteVideo from '../cmps/NoteVideo.js';

import LabelAdd from '../cmps/LabelAdd.js';
import BgAdd from '../cmps/BgAdd.js';

export default {
  emits: ['close-note'],
  props: ['note'],
  template: `
<div>
  <div v-if="dialogOpen" class="note-dialog-backdrop" @click="closeNote"></div>

  <div v-if="dialogOpen" class="note-dialog">
    
    <div class="note-dialog-content">
    <div class="icon-title-container">
      <input class="note-dialog-title" v-model="noteTitle" placeholder="Title">
      <i class="mdi mdi-pin" @click="pinNote"></i>
    </div>
      
      <div class="note-dialog-text">
        <div 
        ref="content"
        :contenteditable="isNoteTxt" 
        @input="updateNoteContent"
        @focus="removeContentEditableBorder"
        @blur="addContentEditableBorder">
        <component 
        :is="getComponentName(note.type)" 
        :note="note"
        :showTitle="false" />
        </div>
      </div>
      
      <div class="tool-tip-dialog">
        <i v-if="!isTrashed" class="material-icons dialog" title="background options" @click="showColorPicker = !showColorPicker">palette</i>
        <BgAdd v-if="showColorPicker" :note="note" @bg-color-change="updateBgColor" />
        <i v-if="isTrashed" class="material-icons dialog" title="delete permanently" @click="deletePermanently(note.id)">delete_forever</i>
        <i class="material-icons dialog" :title="isTrashed ? 'restore' : 'delete'" @click="isTrashed ? restoreNote(note.id) : trashNote(note.id)">
          {{ isTrashed ? 'restore' : 'delete' }}
        </i>
        <i v-if="!isTrashed" class="material-icons dialog" title="Archive" @click="archiveNote(note.id)">archive</i>
        <i v-if="!isTrashed" class="material-icons dialog" title="email note">email</i>
        <button class="note-dialog-close-btn clean-btn" @click="saveNote">Close</button>
      </div>
    </div>
  </div>
</div>
  `,
  data() {
    return {
      showLabelModal: false,
      showColorPicker: false,
      dialogOpen: true,
      noteTitle: this.note.info.title,
      noteContent: this.note.info.txt,
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.isNoteTxt && this.dialogOpen) {
        this.$refs.content.focus();
      }
    });
  },
  computed: {
    isTrashed() {
      return this.note.isTrashed;
    },
    isNoteTxt() {
      return this.note.type === 'NoteTxt';
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
    saveNote() {
      this.$eventBus.emit('note-content-edited', { id: this.note.id, newTitle: this.noteTitle, newContent: this.noteContent });
      this.closeNote();
    },
    updateNoteContent(event) {
      const text = event.target.innerText;
      if (text.trim() !== '') {
        this.noteContent = text;
      }
    },
    
    trashNote() {
      this.$emit('trash', this.note.id);
    },
    archiveNote() {
      this.$eventBus.emit('selected-note-archive', this.note.id);
    },
    deletePermanently() {
      this.$eventBus.emit('remove-permanently', this.note.id);
    },
    restoreNote() {
      this.$eventBus.emit('restore-note', this.note.id);
    },
    closeNote() {
      this.$emit('close-note');
      this.dialogOpen = false;
    },
    removeContentEditableBorder() {
      this.$refs.content.classList.add('no-border');
    },
    addContentEditableBorder() {
      this.$refs.content.classList.remove('no-border');
    },
    pinNote() {
      this.$emit('toggle-pin');
    }
  },
  beforeDestroy() {
    this.$eventBus.$off('note-changed', this.handleNoteChange);
  },
  components: {
    NoteTxt,
    NoteTodos,
    NoteImg,
    NoteVideo,
    BgAdd,
    LabelAdd,
  },
};
