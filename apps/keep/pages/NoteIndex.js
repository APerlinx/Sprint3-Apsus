import { noteService } from '../services/note.service.js';
import {showSuccessMsg,showErrorMsg} from '../../../services/event-bus.service.js';

import NoteFilter from '../cmps/NoteFilter.js';
import NoteList from '../cmps/NoteList.js';
import TrashedNotesList from '../cmps/TrashedNotesList.js';
import NoteAdd from '../cmps/NoteAdd.js';

import KeepMenu from '../cmps/KeepMenu.js';

export default {
  template: `
    <main class="keep-index">
        <NoteAdd 
        @add-note="onAddNote"
        @open-full-display="isFullDisplay"
        :isFullDisplay="fullDisplay" />
    <section class="notes">
    <NoteList 
        v-if="!displayTrashed && !showArchived" 
        :notes="filteredNotes" 
        @trash="trashNote" 
        @pin-state="togglePin" />

    <NoteList 
        v-else-if="showArchived && !displayTrashed" 
        :notes="archivedNotes"
        @trash="trashNote" 
        @pin-state="togglePin" />

    <TrashedNotesList 
        v-else-if="displayTrashed" 
        :trashedNotes="trashedNotes"
        @remove="trashNote" />
    </section>

    <nav class="side-bar" 
     :class="{ 'is-open': isSidebarOpen }"
     @mouseenter="isSidebarOpen = true"
     @mouseleave="isSidebarOpen = false">
           <KeepMenu 
            :isSidebarOpen="isSidebarOpen"
            @display-archived="displayArchived" 
            @display-notes="displayNotes"
            @display-trash="displayTrash"
            @toggle-sidebar="toggleSidebar"  />
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
      displayTrashed: false,
      isSidebarOpen: false,
      fullDisplay: false,
    }
  },
  created() {
    this.fetchNotes();
  },
  computed: {
    filteredNotes() {
      return this.notes.filter((note) => !note.isArchived && !note.isTrashed)
    },
    displayedNotes() {
      if (this.showArchived) {
        return this.archivedNotes
      } else {
        return this.filteredNotes
      }
    },
  },
  mounted() {
    this.$eventBus.on('selected-labels-updated',this.handleSelectedLabelsUpdated)
    this.$eventBus.on('bg-color-change', this.handleBgColorChange)
    this.$eventBus.on('selected-note-archive', this.archiveNote)
    this.$eventBus.on('remove-permanetly', this.removeNote)
    this.$eventBus.on('restore-note', this.restoreNote)
    this.$eventBus.on('note-content-updated', this.setNewText)
  },
  methods: {
    isFullDisplay() {
      this.fullDisplay = true
      console.log('fullDisplay', this.fullDisplay);

    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    setNewText(noteToUpdate) {
      noteService
       .save(noteToUpdate)
    },
    displayArchived() {
      this.showArchived = !this.showArchived;
    },
    displayTrash() {
      this.displayTrashed = !this.displayTrashed;
    },
    displayNotes() {
      this.showArchived = false;
      this.displayTrashed = false;
    },
    archiveNote(noteId) {
      const targetArray = this.notes.find((note) => note.id === noteId)
        ? this.notes
        : this.archivedNotes;
      const noteIndex = targetArray.findIndex((note) => note.id === noteId)

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
      const { selectedLabels, note } = data;
      note.labels = selectedLabels;
      noteService
        .save(note)
        .then((savedNote) => {
          showSuccessMsg('Label updated');
          const index = this.notes.findIndex((n) => n.id === savedNote.id);
          if (index !== -1) {
            this.notes.splice(index, 1, savedNote);
          }
        })
        .catch((err) => {
          showErrorMsg('Cannot add/remove label right now');
        });
    },
    trashNote(noteId) {
      const targetArray = this.notes.find((note) => note.id === noteId)
        ? this.notes
        : this.trashedNotes;
      const noteIndex = targetArray.findIndex((note) => note.id === noteId);

      if (noteIndex !== -1) {
        const noteToTrash = targetArray[noteIndex];
        noteToTrash.isTrashed = !noteToTrash.isTrashed;

        if (noteToTrash.isTrashed) {
          targetArray.splice(noteIndex, 1);
          this.trashedNotes.unshift(noteToTrash);
        } else {
          targetArray.splice(noteIndex, 1);
          this.notes.unshift(noteToTrash);
        }
        noteService
          .save(noteToTrash)
          .then(() => {
            if (noteToTrash.isTrashed) {
              showSuccessMsg('Note trashed!');
            } else {
              showSuccessMsg('Note untrashed!');
            }
          })
          .catch((error) => {
            showErrorMsg('Failed to update note');
          });
      }
    },
    restoreNote(noteId) {
      const noteIndex = this.trashedNotes.findIndex((note) => note.id === noteId);
    
      if (noteIndex !== -1) {
        const noteToRestore = this.trashedNotes[noteIndex];
        noteToRestore.isTrashed = false;
    
        this.trashedNotes.splice(noteIndex, 1);
        this.notes.unshift(noteToRestore);
    
        noteService
          .save(noteToRestore)
          .then(() => {
            showSuccessMsg('Note restored!');
          })
          .catch((error) => {
            showErrorMsg('Failed to restore note');
          });
      }
    },
    removeNote(noteId) {
      noteService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1);
          showSuccessMsg('Note removed');
          this.fetchNotes()
        })
        .catch((err) => {
          showErrorMsg('Cannot remove note')
        });
    },
    onAddNote(newNote) {
      let note = noteService.getEmptynote()
      note.type = 'NoteTxt'
      note.info.txt = newNote
      noteService
        .save(note)
        .then((savedNote) => {
          showSuccessMsg('Note saved')
          this.notes.push(savedNote)
        })
        .catch((err) => {
          showErrorMsg('Cannot save note')
        });
    },
    togglePin(note) {
      const noteIndex = this.notes.findIndex((n) => n.id === note.id)

      if (noteIndex !== -1) {
        this.notes[noteIndex].isPinned = note.isPinned
        noteService
          .save(this.notes[noteIndex])
          .then(() => {
            note.isPinned
              ? showSuccessMsg('Note pinned')
              : showSuccessMsg('Note unpinned')
          })
          .catch((err) => {
            showErrorMsg('Cannot update note')
          });
      } else {
        console.log('Note not found in the list')
      }
    },
    handleBgColorChange({ note, color }) {
      console.log('note,color', note, color)
      note.bgColor = color;
      noteService
        .save(note)
        .then(() => {
          showSuccessMsg('Color applied!')
        })
        .catch((error) => {
          showErrorMsg('Failed to apply color')
        });
    },

    setFilterBy(filterBy) {
      this.filterBy = filterBy
    },
    fetchNotes() {
      noteService
        .query()
        .then((notes) => {
          this.notes = notes.filter(
            (note) => !note.isArchived && !note.isTrashed
          );
          this.archivedNotes = notes.filter((note) => note.isArchived)
          this.trashedNotes = notes.filter((note) => note.isTrashed)
        })
        .catch((error) => console.error('Error fetching notes:', error))
    },
  },
  beforeUnmount() {
    this.$off('display-notes');
    this.$off('display-archived');
    this.$off('display-trash');
  },

  components: {
    NoteFilter,
    NoteList,
    NoteAdd,
    KeepMenu,
    TrashedNotesList,
  },
};
