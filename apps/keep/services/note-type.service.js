'use strict'

export const noteType = {
    getNoteType
}

function getNoteType() {
    return Promise.resolve(types);
}

const types = {
    title: 'BookDetails',
    cmps: [
      {
        type: 'RateBySelect',
        info: {
          label: 'Rating by select:',
          opts: ['1', '2', '3', '4', '5'],
        },
      },
      {
        type: 'RateByStar',
        info: {
          label: 'Rating by stars:',
          opts: ['value'],
          MaxStars: 5,
        },
      },
      {
        type: 'RateByTextbox',
        info: {
          label: 'Rating by textbox:',
          opts: ['value'],
          MaxRating: 5,
        },
      },
    ],
  };
  