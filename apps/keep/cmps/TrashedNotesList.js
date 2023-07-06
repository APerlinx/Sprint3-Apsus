import NotePreview from './NotePreview.js';

export default {
  props: {
    trashedNotes: {
      type: Array,
      required: true,
      default: [],
      validator: function (value) {
        return value.length >= 0;
      },
    },
  },
  template: `  
  <section class="note-list trashed">
    <h5>Trashed</h5>
    <TransitionGroup name="list" tag="ul">
      <li v-for="note in trashedNotes" :key="note.id" class="clean-list">
        <NotePreview :note="note" />
      </li>
    </TransitionGroup>
  </section>
      `,
  computed: {},
  methods: {},
  components: {
    NotePreview,
  },
};
