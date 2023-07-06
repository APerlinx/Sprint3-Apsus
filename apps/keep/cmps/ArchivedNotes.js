export default {
    props: {
        notes: {
          type: Array,
          required: true,
          default: [],
          validator: function (value) {
            return value.length >= 0;
          },
        },
    },
    template: `  
           <section class="archived-notes">
           <section class="note-list pinned" v-if="pinnedNotes.length > 0">
     <h5>pinned</h5>
        <TransitionGroup name="list" tag="ul">
            <li v-for="note in pinnedNotes" :key="note.id" class="clean-list">
             <NotePreview :note="note" @remove="onRemoveNote" @toggle-pin="onTogglePin" />
            </li>
        </TransitionGroup>
    </section>
    <section section class="note-list unpinned">
    <h5>other</h5>
         <TransitionGroup name="list" tag="ul">
            <li v-for="note in unpinnedNotes" :key="note.id" class="clean-list">
             <NotePreview :note="note" @remove="onRemoveNote" @toggle-pin="onTogglePin" />
            </li>
        </TransitionGroup>
    </section>
          </section>  
      `,
    computed: {
      
    },
  };
  