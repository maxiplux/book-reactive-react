import {
  LOAD_TWEET_DETAIL,
  ADD_NEW_TWEET_REPLY
} from '../actions/const'
import update from 'react-addons-update'

let initialState = null

export const tweetDetailStore = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TWEET_DETAIL:
      return action.tweetDetails
    case ADD_NEW_TWEET_REPLY:
      return update(state, {
          replysTweets: {$splice: [[0, 0, action.newTweetReply]]}
        })
    default:
      return state
  }
}

export default tweetDetailStore
