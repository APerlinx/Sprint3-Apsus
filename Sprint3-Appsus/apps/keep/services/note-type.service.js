'use strict'

export const noteType = {
    getNoteType
}

function getNoteType() {
    return Promise.resolve(types);
}

const types = {
    title: 'NotePreview',
    cmps: [
      {
        type: 'NoteTxt',
        info: {
          label: 'Text Note',
          
        },
      },
    ],
  };
  