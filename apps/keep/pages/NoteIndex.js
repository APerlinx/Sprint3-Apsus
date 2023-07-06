import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'


import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import NoteAdd from '../cmps/NoteAdd.js'

import KeepMenu from '../cmps/KeepMenu.js'

export default {
  template: `
    <main class="keep-index">
        <NoteAdd @add-note="onAddNote" />
        <section class="notes">
            <NoteList
             v-if="notes"
             :notes="displayedNotes"
             @remove="removeNote" 
             @pin-state="togglePin" />
        </section>
        <nav class="menu">
            <KeepMenu 
            @display-archived="displayArchived" 
            @display-notes="displayArchived"
            @display-trash="displayTrash" />
        </nav>
    </main>
  
    `,
  data() {
    return {
      notes: [],
      archivedNotes: [],
      trashedNotes: [],
      filterBy: null,
      showArchived: false,
    };
  },
  created() {
    this.fetchNotes()
  },
  computed: {
    filteredNotes() {
      return this.notes.filter((note) => !note.isArchived);
    },
    displayedNotes() {
      if (this.showArchived) {
        return this.archivedNotes;
      } else {
        return this.filteredNotes;
      }
    },
  },
  mounted() {
    this.$eventBus.on('selected-labels-updated', this.handleSelectedLabelsUpdated)
    this.$eventBus.on('bg-color-change', this.handleBgColorChange)
    this.$eventBus.on('selected-note-archive', this.archiveNote)
    },
  methods: {
    displayArchived() {
      this.showArchived = !this.showArchived;
    },
    archiveNote(noteId) {
      const targetArray = this.notes.find((note) => note.id === noteId) ? this.notes : this.archivedNotes;
      const noteIndex = targetArray.findIndex((note) => note.id === noteId);
    
      if (noteIndex !== -1) {
        const noteToArchive = targetArray[noteIndex];
        noteToArchive.isArchived = !noteToArchive.isArchived;
    
        if (noteToArchive.isArchived) {
          targetArray.splice(noteIndex, 1);
          this.archivedNotes.unshift(noteToArchive);
        } else {
          targetArray.splice(noteIndex, 1);
          this.notes.unshift(noteToArchive);
        }
    
        noteService
          .save(noteToArchive)
          .then(() => {
            if (noteToArchive.isArchived) {
              showSuccessMsg('Note archived!');
            } else {
              showSuccessMsg('Note unarchived!');
            }
          })
          .catch((error) => {
            showErrorMsg('Failed to update note');
          });
      }
    },
    
    handleSelectedLabelsUpdated(data) {
 
      const { selectedLabels, note } = data
      note.labels = selectedLabels;
      noteService.save(note)
        .then(savedNote => {
          showSuccessMsg('Label updated')
          const index = this.notes.findIndex(n => n.id === savedNote.id)
          if (index !== -1) {
            this.notes.splice(index, 1, savedNote)
          }
        })
        .catch(err => {
          showErrorMsg('Cannot add/remove label right now')
        })
    },
    
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
          this.notes.push(savedNote)
      })
      .catch(err => {
          showErrorMsg('Cannot save note')
      })
    },
    togglePin(note) {
      const noteIndex = this.notes.findIndex((n) => n.id === note.id)
    
      if (noteIndex !== -1) {

        this.notes[noteIndex].isPinned = note.isPinned
        noteService.save(this.notes[noteIndex])
          .then(() => {
            note.isPinned ?
            showSuccessMsg('Note pinned')
            :
            showSuccessMsg('Note unpinned')
          })
          .catch((err) => {
            showErrorMsg('Cannot update note')
          });
      } else {
        console.log('Note not found in the list')
      }
    },
    handleBgColorChange({ note, color }) {
      console.log('note,color', note,color);
      note.bgColor = color;
      noteService.save(note)
        .then(() => {
          showSuccessMsg('Color applied!')
        })
        .catch((error) => {
          showErrorMsg('Failed to apply color');
        });
    },
    
    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
    fetchNotes() {
      noteService
        .query()
        .then((notes) => {
          this.notes = notes.filter((note) => !note.isArchived);
          this.archivedNotes = notes.filter((note) => note.isArchived);
        })
        .catch((error) => console.error('Error fetching notes:', error));
    },
  },
  components: {
    NoteFilter,
    NoteList,
    NoteAdd,
    KeepMenu,
  },
};
