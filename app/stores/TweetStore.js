import {
  LOAD_TWEETS
} from '../actions/const'

const initialState = {
  tweets: []
}

export const  tweetsStore = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEETS:
      return {
        tweets: action.tweets
      }
    default:
      return state

  }
}

export default tweetsStore
