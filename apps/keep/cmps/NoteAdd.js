export default {
  emits: ['add-note','open-full-display'],
  props: ['isFullDisplay'],
  template: `  
    <div 
      class="add-note faux-input"
      :class="{ 'full-display': isFullDisplay }"  
      role="textbox" 
      @click="$emit('open-full-display')" 
      ref="noteDiv">

      <div v-if="!isFullDisplay" class="faux-caret"></div>

      <div v-if="isFullDisplay" class="note-header">
        <input type="text" v-model="noteTitle" placeholder="Title" />
      </div>

      <input
       type="text"
       placeholder="Take a note..."
       v-if="isFullDisplay"
       v-model="noteContent" 
       placeholder="Take a note..." 
       @input="handleInput"
       ref="noteContentInput">

      <div v-if="isFullDisplay" class="note-footer">
      <div class="icons">
      <i class="material-icons" title="add labels">label</i>
      <i class="material-icons" title="background options">palette</i>
      <i class="material-icons" title="archive">archive</i>
      </div>
      <button class="clean-btn">Close</button>
      </div>

    </div>
    `,
   data() {
    return {
      showNoteText: true,
      noteText: '',
      noteTitle: '',
      noteContent: '',
    }
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
      const content = this.noteContent.trim();
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
  watch: {
    isFullDisplay(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.$refs.noteContentInput.focus();
        });
      }
    },
  },
}
