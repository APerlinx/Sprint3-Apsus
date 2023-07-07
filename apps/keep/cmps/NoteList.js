import NotePreview from './NotePreview.js'

export default {
  emits: ['trash','pin-state'],
  props: {
    notes: {
      type: Array,
      required: true,
      default: [],
      validator: function (value) {
        return value.length >= 0
      },
    },
  },
  template: `
     <section class="note-list pinned" v-if="pinnedNotes.length > 0">
     <h5>pinned</h5>
        <TransitionGroup name="list" tag="ul">
            <li v-for="note in pinnedNotes" :key="note.id" class="clean-list">
             <NotePreview :note="note" @trash="onTrashNote" @toggle-pin="onTogglePin" />
            </li>
        </TransitionGroup>
    </section>
    <section section class="note-list unpinned">
    <h5>other</h5>
         <TransitionGroup name="list" tag="ul">
            <li v-for="note in unpinnedNotes" :key="note.id" class="clean-list">
             <NotePreview :note="note" @trash="onTrashNote" @toggle-pin="onTogglePin" />
            </li>
        </TransitionGroup>
    </section>

    `,
    data() {
        return {};
      }, 
  computed: {
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned)
    },
    unpinnedNotes() {
      return this.notes.filter((note) => !note.isPinned)
    },
  },
  methods: {
    onTrashNote(noteId) {
      this.$emit('trash', noteId);
    },
    onTogglePin(note) {
        this.$emit('pin-state', note);
    }
  },
  components: {
    NotePreview,
  },
};
