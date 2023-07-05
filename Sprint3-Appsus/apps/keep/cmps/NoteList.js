import NotePreview from './NotePreview.js'

export default {
    props: {
        notes: {
          type: Array,
          required: true,
          default: [],
          validator: function(value) {
            return value.length >= 0;
          }
        }
    },
    template: `
        <section class="note-list">
            <ul>
                <li v-for="note in notes" :key="note.id">
                    <section class="actions">
                        <button @click="onRemoveNote(note.id)" class="remove-btn clean-btn">x</button>
                    </section>
                    <NotePreview :note="note" class="note-preview"/>
                </li>
            </ul>
        </section>
    `,
    methods: {
        onRemoveNote(noteId) {
            this.$emit('remove',noteId)
        },
    },
    components: {
       NotePreview,
    }
}