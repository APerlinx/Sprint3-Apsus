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
        labels: ['Work'],
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
        labels: [],
        isPinned: false,
        info: {
          url: 'https://picsum.photos/200',
          title: 'Place to vist'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        labels: ['Work','Critical'],
        isPinned: false,
        info: {
          title: 'Get my stuff together',
          todos: [
            { txt: 'Buy Coding powder', doneAt: null },
            { txt: 'Coding power', doneAt: 187111111 }
          ]
        }
      },
      {
        id: 'n104',
        type: 'NoteTodos',
        labels: [],
        isPinned: false,
        info: {
          title: 'Coding',
          todos: [
            { txt: 'Master Javascript', doneAt: null },
            { txt: 'Master Vue', doneAt: null },
            { txt: 'Learn Angular and react', doneAt: null },
          ]
        }
      },
      {
        id: 'n105',
        type: 'NoteImg',
        labels: [],
        isPinned: false,
        labels: ['Memories'],
        info: {
          url: 'https://picsum.photos/201',
          title: 'Memories'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n106',
        type: 'NoteTxt',
        labels: [],
        isPinned: false,
        info: {
          txt: 'Dont forget to buy your girlfriend gift this time'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n107',
        type: 'NoteTodos',
        labels: [],
        isPinned: false,
        info: {
          title: 'Books to read',
          todos: [
            { txt: 'The brothers Karamazov', doneAt: null },
            { txt: 'A tale of two cities', doneAt: null },
            { txt: 'The lord of the rings', doneAt: null },
          ]
        }
      },
      {
        id: 'n108',
        type: 'NoteTxt',
        labels: [],
        isPinned: false,
        info: {
          txt: 'Pick up parents from the airpot on the 4 of july'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n109',
        type: 'NoteTxt',
        labels: [],
        isPinned: false,
        info: {
          txt: 'Project deadline is on the 8.7 before submit clean the code a little bit'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n110',
        type: 'NoteVideo',
        labels: [],
        isPinned: false,
        info: {
          title: 'Watch when you have time',
          url: 'https://www.youtube.com/embed/_L-Ni7bFAHg'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n111',
        type: 'NoteTxt',
        labels: [],
        isPinned: true,
        info: {
          txt: 'the city dumps fill the junkyards fill the madhouses fill the hospitals fill the graveyards fill nothing else fills.', 
          title: 'Charles Bukowski poet'
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n112',
        type: 'NoteTxt',
        labels: [],
        isPinned: false,
        info: {
          txt: 'Ask friends if they have Edgar Allen Po books to borrow.', 
        },
        style: {
          backgroundColor: '#00d'
        }
      },
      {
        id: 'n103',
        type: 'NoteTodos',
        labels: [],
        isPinned: false,
        info: {
          title: 'Places to see',
          todos: [
            { txt: 'Niagara falls.', doneAt: null },
            { txt: 'Climb el capitan,US.', doneAt: null },
            { txt: 'Grand Canyon', doneAt: null },
            { txt: 'Pyramids', doneAt: null },
            { txt: 'Seijalandsfoss,Iceland', doneAt: null },
            { txt: 'mt.pyrenees', doneAt: null },
            { txt: 'Gridwood.Alaska', doneAt: null },
          ]
        }
      },
      {
        id: 'n112',
        type: 'NoteTxt',
        labels: [],
        isPinned: false,
        info: {
          txt: 'Buy new gi for bjj clas next month.', 
        },
        style: {
          backgroundColor: '#00d'
        }
      },
    ];
  
    utilService.saveToStorage(NOTE_KEY, notes);
  }
  }
  

  
