import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js';

import LabelAdd from './LabelAdd.js';

export default {
  emits: ['add-note', 'open-full-display', 'close-full-display'],
  props: {
    isFullDisplay: {
      type: Boolean,
      default: false
    }
  },
  template: `
    <div 
      class="add-note faux-input"
      :class="{ 'full-display': isFullDisplay }"  
      role="textbox" 
      @click="handleClick" 
      ref="noteDiv"
    >
      <div v-if="!isFullDisplay" class="faux-caret"></div>
      <div v-if="isFullDisplay" class="note-header">
        <input type="text" v-model="noteTitle" placeholder="Title" />
      </div>
      <input
        type="text"
        placeholder="Take a note..."
        v-if="isFullDisplay"
        v-model="noteContent" 
        @input="handleInput"
        ref="noteContentInput">

      <div v-if="!isFullDisplay" class="note-icons">
        <div class="note-icon" @click="createTextNote">
          <i class="mdi mdi-pencil mdi-dark" title="Text Note"></i>
        </div>
        <div class="note-icon" @click="createImageNote">
          <i class="mdi mdi-image mdi-dark" title="Image Note"></i>
        </div>
        <div class="note-icon" @click="createVideoNote">
          <i class="mdi mdi-youtube mdi-dark" title="Video Note"></i>
        </div>
        <div class="note-icon" @click="createListNote">
          <i class="mdi mdi-format-list-bulleted mdi-dark" title="List Note"></i>
        </div>
      </div>

      <div v-if="isFullDisplay" class="note-footer">
        <div class="icons">
          <i class="material-icons" title="Add labels" @click="this.showLabelAdd = !this.showLabelAdd">label</i>
          <i class="material-icons" title="Background options">palette</i>
          <i class="material-icons" @click="archiveNote()" title="Archive">archive</i>
        </div>
        <button class="clean-btn" @click.stop="handleClose">Close</button>
      </div>
      <LabelAdd v-if="showLabelAdd" @close-modal="this.showLabelAdd = !this.showLabelAdd" @selected-labels="addLabels" />
    </div>
  `,
  data() {
    return {
      showLabelAdd: false,
      showNoteText: true,
      noteTitle: '',
      noteContent: '',
      noteType: '',
      isArchived: false,
      labels: [],
    };
  },
  methods: {

    createTextNote() {
      this.noteType = 'NoteTxt';
    },

    createImageNote() {
      this.noteType = 'NoteImg';
    },

    createVideoNote() {
      this.noteType = 'NoteVideo';
    },

    createListNote() {
      this.noteType = 'NoteTodos';
    },

    handleClick() {
      if (!this.isFullDisplay) {
        this.$emit('open-full-display');
      }
    },

    archiveNote() {
      this.isArchived = !this.isArchived
      if (this.isArchived) showSuccessMsg('Note archived!')
      else showSuccessMsg('Note unarchived')
    },

    handleClose() {
      this.$emit('close-full-display')
      if (!this.noteType) this.noteType = 'NoteTxt'
      this.$emit('add-note', {
        content: this.noteContent,
        title: this.noteTitle,
        type: this.noteType,
        labels: this.labels,
        isArchived: this.isArchived
      })
      this.handleInputReset()
    },

    handleInputReset() {
      this.noteContent = ''
      this.noteTitle = ''
      this.noteType = ''
      this.isArchived = false
    },

    handleInput() {
      const content = this.noteContent.trim();
      this.showNoteText = content.length === 0;
    },
    handleBlur() {
      if (this.$refs.noteDiv.innerText.trim() === "") {
        this.showNoteText = true;
      }
    },
    addLabels(selectedLabels) {
      this.labels = selectedLabels
    },
  },
  watch: {

    isFullDisplay(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.noteContentInput.focus();
        });
      }
    },
  },
  components: {
    LabelAdd
  }
};
