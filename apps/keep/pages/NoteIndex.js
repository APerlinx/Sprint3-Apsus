import { noteService } from '../services/note.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import TrashedNotesList from '../cmps/TrashedNotesList.js'
import NoteAdd from '../cmps/NoteAdd.js'
import EditLabel from '../cmps/EditLabel.js'

import KeepMenu from '../cmps/KeepMenu.js'

export default {
  template: `
    <main class="main-content">
      <NoteAdd
        v-if="!displayArchived || !displayTrashed"
        @add-note="onAddNote"
        @open-full-display="openFullDisplay"
        :isFullDisplay="fullDisplay"
        @close-full-display="closeFullDisplay"
      />
      <section class="notes">
        <NoteList
          v-if="!displayTrashed && !displayArchive"
          :labels="labels"
          :notes="filteredNotes"
          @trash="trashNote"
          @pin-state="togglePin"
        />

        <NoteList
          v-else-if="displayArchive && !displayTrashed"
          :notes="archivedNotes"
          :labels="labels"
          @trash="trashNote"
          @pin-state="togglePin"
        />

        <TrashedNotesList
          v-else-if="displayTrashed"
          :trashedNotes="trashedNotes"
          @remove="trashNote"
        />
      </section>

      <nav
        class="side-bar"
        :class="{ 'is-open': isSidebarOpen }"
        @mouseenter="isSidebarOpen = true"
        @mouseleave="isSidebarOpen = false"
      >
        <KeepMenu
          :isSidebarOpen="isSidebarOpen"
          :labels="labels"
          @display-archived="displayArchived"
          @display-notes="displayNotes"
          @display-trash="displayTrash"
          @clear-filter="clearFilter"
          @open-add-label="toggleAddLabelModal"
        />

        <EditLabel
          v-if="isAddLabelModalOpen && labels"
          :labels="labels"
          @new-label-created="handleNewLabel"
          @close-add-label="toggleAddLabelModal"
          @delete-label="deleteLabel"
        />
      </nav>
    </main>
  `,
  data() {
    return {
      notes: [],
      archivedNotes: [],
      trashedNotes: [],
      labels: [],
      filterBy: null,
      searchQuery: null,
      displayArchive: false,
      displayTrashed: false,
      isSidebarOpen: false,
      fullDisplay: false,
      isAddLabelModalOpen: false,
    }
  },
  created() {
    this.initializeNotes()

    this.fetchLabels()
    const queryLabel = this.$route.query.label
    const querySearch = this.$route.query.search
    if (queryLabel) this.filterBy = queryLabel
    if (querySearch) this.searchQuery = querySearch
  },
  computed: {
    filteredNotes() {
      return this.notes.filter((note) => !note.isArchived && !note.isTrashed)
    },
    displayedNotes() {
      if (this.displayArchive) {
        return this.archivedNotes
      } else {
        return this.filteredNotes
      }
    },
  },
  mounted() {
    this.$eventBus.on('selected-labels-updated', this.handleSelectedLabelsUpdated)
    this.$eventBus.on('bg-color-change', this.handleBgColorChange)
    this.$eventBus.on('selected-note-archive', this.archiveNote)
    this.$eventBus.on('remove-permanently', this.removeNote)
    this.$eventBus.on('restore-note', this.restoreNote)
    this.$eventBus.on('note-content-edited', this.handleNoteChange)
  },
  methods: {
    toggleAddLabelModal() {
      this.isAddLabelModalOpen = !this.isAddLabelModalOpen
    },
    clearFilter() {
      this.$router.push({ path: '/note' })
      this.filterBy = null
      this.fetchNotes()
    },

    openFullDisplay() {
      this.fullDisplay = true
    },

    closeFullDisplay() {
      this.fullDisplay = false
    },

    displayArchived() {
      this.displayArchive = !this.displayArchive
    },

    displayTrash() {
      this.displayTrashed = !this.displayTrashed
    },

    displayNotes() {
      this.displayArchive = false
      this.displayTrashed = false
    },

    deleteLabel(label) {
      noteService.removeLabel(label)
    },

    handleNoteChange({ id, newTitle, newContent }) {
      const note = this.notes.find((note) => note.id === id)
      if (note) {
        console.log('newTitle', newTitle)
        note.info.title = newTitle
        note.info.txt = newContent
      }
      noteService.save(note)
    },
    archiveNote(noteId) {
      const targetArray = this.notes.find((note) => note.id === noteId)
        ? this.notes
        : this.archivedNotes
      const noteIndex = targetArray.findIndex((note) => note.id === noteId)

      if (noteIndex !== -1) {
        const noteToArchive = targetArray[noteIndex]
        noteToArchive.isArchived = !noteToArchive.isArchived

        if (noteToArchive.isArchived) {
          targetArray.splice(noteIndex, 1)
          this.archivedNotes.unshift(noteToArchive)
        } else {
          targetArray.splice(noteIndex, 1)
          this.notes.unshift(noteToArchive)
        }

        noteService
          .save(noteToArchive)
          .then(() => {
            if (noteToArchive.isArchived) {
              showSuccessMsg('Note archived!')
            } else {
              showSuccessMsg('Note unarchived!')
            }
          })
          .catch((error) => {
            showErrorMsg('Failed to update note')
          })
      }
    },

    handleSelectedLabelsUpdated(data) {
      const { selectedLabels, note } = data
      note.labels = selectedLabels
      noteService
        .save(note)
        .then((savedNote) => {
          showSuccessMsg('Label updated')
          const index = this.notes.findIndex((n) => n.id === savedNote.id)
          if (index !== -1) {
            this.notes.splice(index, 1, savedNote)
          }
        })
        .catch((err) => {
          showErrorMsg('Cannot add/remove label right now')
        })
    },

    handleNewLabel(newLabel) {
      noteService.addNewLabel(newLabel)
      this.fetchLabels()
    },

    fetchLabels() {
      noteService
        .getLabels()
        .then((labels) => {
          this.labels = labels
        })
        .catch((error) => {
          console.error('Failed to fetch labels:', error)
        })
    },

    trashNote(noteId) {
      const targetArray = this.notes.find((note) => note.id === noteId)
        ? this.notes
        : this.trashedNotes
      const noteIndex = targetArray.findIndex((note) => note.id === noteId)

      if (noteIndex !== -1) {
        const noteToTrash = targetArray[noteIndex]
        noteToTrash.isTrashed = !noteToTrash.isTrashed

        if (noteToTrash.isTrashed) {
          targetArray.splice(noteIndex, 1)
          this.trashedNotes.unshift(noteToTrash)
        } else {
          targetArray.splice(noteIndex, 1)
          this.notes.unshift(noteToTrash)
        }
        noteService
          .save(noteToTrash)
          .then(() => {
            if (noteToTrash.isTrashed) {
              showSuccessMsg('Note trashed!')
            } else {
              showSuccessMsg('Note untrashed!')
            }
          })
          .catch((error) => {
            showErrorMsg('Failed to update note')
          })
      }
    },

    restoreNote(noteId) {
      const noteIndex = this.trashedNotes.findIndex((note) => note.id === noteId)

      if (noteIndex !== -1) {
        const noteToRestore = this.trashedNotes[noteIndex]
        noteToRestore.isTrashed = false

        this.trashedNotes.splice(noteIndex, 1)
        this.notes.unshift(noteToRestore)

        noteService
          .save(noteToRestore)
          .then(() => {
            showSuccessMsg('Note restored!')
          })
          .catch((error) => {
            showErrorMsg('Failed to restore note')
          })
      }
    },

    removeNote(noteId) {
      noteService
        .remove(noteId)
        .then(() => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note removed')
          this.fetchNotes()
        })
        .catch((err) => {
          showErrorMsg('Cannot remove note')
        })
    },

    onAddNote(newNoteData) {
      let note = noteService.getEmptynote()
      note.type = newNoteData.type
      note.labels = newNoteData.labels
      const handlers = {
        'NoteTxt': this.addTextNote,
        'NoteImg': this.addImageNote,
        'NoteVideo': this.addVideoNote,
        'NoteTodos': this.addTodosNote,
      }
      if (handlers.hasOwnProperty(note.type)) {
        handlers[note.type](note, newNoteData)
      } else {
        console.log('something went wrong in onAddNote')
      }
      noteService
        .save(note)
        .then((savedNote) => {
          showSuccessMsg('Note saved')
          if (savedNote.isArchived) {
            this.archivedNotes.push(savedNote)
          } else {
            this.notes.push(savedNote)
          }
        })
        .catch((err) => {
          showErrorMsg('Cannot save note')
        })
    },

    addTextNote(note, newNoteData) {
      note.isArchived = newNoteData.isArchived
      note.info.txt = newNoteData.content
      note.info.title = newNoteData.title
    },

    addImageNote(note, newNoteData) {
      note.info.title = newNoteData.title
      note.info.url = newNoteData.content
    },

    addVideoNote(note, newNoteData) {
      note.info.title = newNoteData.title
      const videoId = noteService.getVideoIdFromUrl(newNoteData.content)
      if (videoId === null) {
        showErrorMsg('Video url is not valid')
      } else {
        const embedUrl = `https://www.youtube.com/embed/${videoId}`
        note.info.url = embedUrl
      }
    },

    addTodosNote(note, newNoteData) {
      note.info.title = newNoteData.title
      const items = newNoteData.content.split(',')
      note.info.todos = items.map((item) => ({
        txt: item.trim(),
        doneAt: null
      }))
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
          })
      } else {
        console.log('Note not found in the list')
      }
    },

    handleBgColorChange({ note, color }) {
      console.log('note, color', note, color)
      note.bgColor = color
      noteService
        .save(note)
        .then(() => {
          showSuccessMsg('Color applied!')
        })
        .catch((error) => {
          showErrorMsg('Failed to apply color')
        })
    },

    fetchNotes() {
      noteService
        .query()
        .then((notes) => {
          if (this.filterBy || this.searchQuery) {
            const query = this.filterBy || this.searchQuery

            const filteredNotes = notes.filter((note) => {
              return (
                !note.isArchived &&
                !note.isTrashed &&
                note.labels &&
                note.labels.includes(query)
              )
            })
            this.notes = filteredNotes
          } else {
            const filteredNotes = notes.filter((note) => !note.isArchived && !note.isTrashed)
            this.notes = filteredNotes
          }

          this.archivedNotes = notes.filter((note) => note.isArchived)
          this.trashedNotes = notes.filter((note) => note.isTrashed)
        })
        .catch((error) => console.error('Error fetching notes:', error))
    },
    initializeNotes() {
      if (!this.$route.query.subject || !this.$route.query.body) return
      const mailNote = noteService.getEmptynote()
      mailNote.info.title = this.$route.query.subject || ''
      mailNote.info.txt = decodeURIComponent(this.$route.query.body) || ''
      mailNote.type = 'NoteTxt'
      noteService.save(mailNote).then(() => {
        this.notes.push(mailNote)
        this.fetchNotes()
      })
    },
  },

  watch: {
    '$route.query.search': {
      immediate: true,
      handler(newVal) {
        this.searchQuery = newVal
        this.fetchNotes()
      },
    },
    '$route.query.label': {
      immediate: true,
      handler(newVal) {
        this.filterBy = newVal
        this.fetchNotes()
      },
    },
  },
  components: {
    NoteFilter,
    NoteList,
    NoteAdd,
    KeepMenu,
    TrashedNotesList,
    EditLabel,
  },
}
