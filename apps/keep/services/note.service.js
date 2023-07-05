import { utilService } from '../../../services/util.service.js';
import { storageService } from '../../../services/async-storage.service.js'

// import notesData from '../data/note-data.js'

const PAGE_SIZE = 5
const NOTE_KEY = 'noteDB'

var gFilterBy = {}
var gSortBy = {}
var gPageIdx;

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptynote,
  getNextnoteId,
  getFilterBy,
  setFilterBy,
  getnoteCountBySpeedMap,
  addReview,
  removeReview,
  // pinUnpin,
};
window.noteService = noteService;

function query() {
  return storageService.query(NOTE_KEY).then((notes) => {
    if (gFilterBy.title) {
      const regex = new RegExp(gFilterBy.title, 'i');
      notes = notes.filter((note) => regex.test(note.title));
    }
    if (gPageIdx !== undefined) {
      const startIdx = gPageIdx * PAGE_SIZE;
      notes = notes.slice(startIdx, startIdx + PAGE_SIZE);
    }
    if (gSortBy.price !== undefined) {
        notes.sort((c1, c2) => (c1.price - c2.price) * gSortBy.price);
    } else if (gSortBy.title !== undefined) {
        notes.sort((c1, c2) => c1.title.localeCompare(c2.title) * gSortBy.title);
    }

    return notes;
  });
}

function get(noteId) {
  return storageService.get(NOTE_KEY, noteId)
      .then(note => _setNextPrevnoteId(note))
}

function remove(noteId) {
  return storageService.remove(NOTE_KEY, noteId);
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note);
  } else {
    return storageService.post(NOTE_KEY, note);
  }
}

function getEmptynote() {
    return {
      id: '',
      createdAt: Date.now(),
      type: '',
      isPinned: false,
      style: {
        backgroundColor: '#00d'
      },
      info: {
        txt: 'New Note!'
      }
    };
}
  

function getFilterBy() {
  return { ...gFilterBy };
}

function setFilterBy(filterBy = {}) {
  if (filterBy.title !== undefined) gFilterBy.title = filterBy.title;
  if (filterBy.price !== undefined) gFilterBy.price = filterBy.price;
  return gFilterBy;
}

function getNextnoteId(noteId) {
  return storageService.query(NOTE_KEY).then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId);
    if (idx === notes.length - 1) idx = -1;
    return notes[idx + 1].id;
  });
}

// function pinUnpin(noteId) {
//     return get(noteId) 
//             .then(note => {
//               note.isPinned ? 
//                 !note.isPinned
//                 : note.isPinned === tr
//             } )
//     console.log('note', note);
// }

function getnoteCountBySpeedMap() {
  return storageService.query(NOTE_KEY).then((notes) => {
    const noteCountBySpeedMap = notes.reduce(
      (map, note) => {
        if (note.price < 120) map.cheap++;
        else if (note.price < 200) map.normal++;
        else map.expensive++;
        return map;
      },
      { cheap: 0, normal: 0, expensive: 0 }
    );
    return noteCountBySpeedMap;
  });
}


function addReview(noteId, review) {
  return get(noteId)
      .then(note => {
          if (!note.reviews) note.reviews = []
          review.id = utilService.makeId()
          note.reviews.push(review)
          return save(note)
      })
}

function removeReview(noteId, reviewId) {
  return get(noteId)
      .then(note => {
          const idx = note.reviews.findIndex(review => review.id === reviewId)
          note.reviews.splice(idx, 1)
          return save(note)
      })
}

function _setNextPrevnoteId(note) {
  return storageService.query(NOTE_KEY)
      .then(notes => {
          const noteIdx = notes.findIndex(currNote => currNote.id === note.id)
          note.nextnoteId = notes[noteIdx + 1] ? notes[noteIdx + 1].id : notes[0].id
          note.prevnoteId = notes[noteIdx - 1]
              ? notes[noteIdx - 1].id
              : notes[notes.length - 1].id
          return note
      })
}

// function _createnotes() {
//   let notes = utilService.loadFromStorage(NOTE_KEY);
//   if (!notes || !notes.length) {
//     notes = notesData;
//     utilService.saveToStorage(NOTE_KEY, notes);
//   }
// }

function _createnote(title) {
  const note = getEmptynote(title);
  note.id = utilService.makeId();
  return note;
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
      notes = [
      {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
          backgroundColor: '#00d'
        },
        info: {
          txt: 'Fullstack Me Baby!'
        }
      },
      {
        id: 'n102',
        type: 'NoteImg',
        isPinned: false,
        info: {
          url: 'http://some-img/me',
          title: 'Bobi and Me'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Driving license', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 }
          ]
        }
      },
      {
        id: 'n104',
        type: 'NoteTodos',
        isPinned: false,
        info: {
          title: 'Coding',
          todos: [
            { txt: 'Learn Javascript', doneAt: null },
            { txt: 'Learn Vue', doneAt: null },
            { txt: 'Learn Angular', doneAt: null },
          ]
        }
      }
    ];
  
    utilService.saveToStorage(NOTE_KEY, notes);
  }
  }
  

  
