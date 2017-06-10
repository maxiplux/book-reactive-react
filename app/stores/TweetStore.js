import {
  LOAD_TWEETS,
  ADD_NEW_TWEET_SUCCESS,
  CLEAR_TWEETS
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
    case ADD_NEW_TWEET_SUCCESS:
      return {
        tweets: action.tweets
      }
    default:
      return state

  }
}

export default tweetsStore
