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
    labels: {
      type: Array,
      default: () => [],
    }
  },
  template: `
    <section class="note-list pinned" v-if="pinnedNotes.length > 0">
      <p class="section-title">pinned</p>
          <TransitionGroup name="list" tag="ul">
              <li v-for="note in pinnedNotes" :key="note.id" class="clean-list">
              <NotePreview 
              :note="note" 
              :labels="labels"
              @trash="onTrashNote" 
              @toggle-pin="onTogglePin" />
              </li>
          </TransitionGroup>
    </section>

    <section section class="note-list unpinned">
      <p class="section-title">others</p>
          <TransitionGroup name="list" tag="ul">
              <li v-for="note in unpinnedNotes" :key="note.id" class="clean-list">
              <NotePreview 
              :note="note" 
              :labels="labels"
              @trash="onTrashNote" 
              @toggle-pin="onTogglePin" />
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
      this.$emit('trash', noteId)
    },
    onTogglePin(note) {
        this.$emit('pin-state', note)
    }
  },
  components: {
    NotePreview,
  },
};
