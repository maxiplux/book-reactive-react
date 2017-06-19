import { combineReducers } from 'redux'
import loginReducer from './LoginReducer'
import tweetsReducer from './TweetReducer'
import sugestedUserReducer from './SugestedUserReducer'
import loginFormReducer from './LoginFormReducer'
import signupFormReducer from './SignupFormReducer'
import followerReducer from './FollowerReducer'
import userPageReducer from './UserPageReducer'
import replyReducer from './ReplyReducer'
import tweetDetailReducer from './TweetDetailReducer'

export default combineReducers({
  loginReducer,
  tweetsReducer,
  sugestedUserReducer,
  loginFormReducer,
  signupFormReducer,
  followerReducer,
  userPageReducer,
  replyReducer,
  tweetDetailReducer
})
