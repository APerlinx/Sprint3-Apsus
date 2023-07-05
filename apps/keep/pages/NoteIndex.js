import { noteService } from '../services/note.service.js';
import {
  showSuccessMsg,
  showErrorMsg,
} from '../../../services/event-bus.service.js';

import NoteFilter from '../cmps/NoteFilter.js';
import NoteList from '../cmps/NoteList.js';
import NoteAdd from '../cmps/NoteAdd.js';

import KeepMenu from '../cmps/KeepMenu.js'

export default {
  template: `
    <main class="keep-index">
        <NoteAdd @add-note="onAddNote" />
        <section class="notes">
            <NoteList
             v-if="notes"
             :notes="notes"
             @remove="removeNote" />
        </section>
        <nav class="menu">
            <KeepMenu />
        </nav>
    </main>
  
    `,
  data() {
    return {
      notes: [],
      filterBy: null,
    };
  },
  created() {
    noteService
      .query()
      .then((notes) => (this.notes = notes))
      .catch((error) => console.error('Error fetching notes:', error))
  },
  methods: {
    removeNote(noteId) {
      noteService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('note removed')
        })
        .catch((err) => {
          showErrorMsg('Cannot remove note')
        });
    },
    onAddNote(newNote) {
      let note = noteService.getEmptynote()
      note.type = 'NoteTxt'
      note.info.txt = newNote
      noteService.save(note)
      .then(savedNote => {
          showSuccessMsg('Note saved')
          this.notes.push(savedNote);
      })
      .catch(err => {
          showErrorMsg('Cannot save note')
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
    KeepMenu,
  },
};
