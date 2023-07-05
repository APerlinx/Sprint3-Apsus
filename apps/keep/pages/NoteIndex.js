import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import NoteAdd from '../cmps/NoteAdd.js'


export default {

	template: `
    <main class="keep-index">
        <NoteAdd />
        <section class="notes">
            <NoteList
             v-if="notes"
             :notes="notes"
             @remove="removeSelected" />
        </section>
        <nav class="menu">
            <h1>navbar</h1>
        </nav>
    </main>
  
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
        }
    },
    created() {
        noteService
          .query()
          .then(notes => this.notes = notes)
          .catch((error) => console.error('Error fetching notes:', error))
      },
      methods: {
        removeSelected(noteId) {
          noteService.remove(noteId)
            .then(() => {
             const idx = this.notes.findIndex((note) => note.id === noteId)
              this.notes.splice(idx, 1)
              showSuccessMsg('note removed')
            })
            .catch(err => {
              showErrorMsg('Cannot remove note')
            })
        },
    
        setFilterBy(filterBy) {
          this.filterBy = filterBy
        },
      },
      components: {
        NoteFilter,
        NoteList,
        NoteAdd,
      },
}
