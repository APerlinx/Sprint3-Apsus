'use strict'

export const ratingService = {
    getRating
}

function getRating() {
    return Promise.resolve(survey);
}

const survey = {
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
  