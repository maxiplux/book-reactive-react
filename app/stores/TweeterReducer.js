import { combineReducers } from 'redux'
import loginStore from './loginStore'
import tweetsStore from './TweetStore'
import sugestedUserStore from './SugestedUserStore'
import loginFormStore from './LoginFormStore'
import signupFormStore from './SignupFormStore'
import followerStore from './FollowerStore'
import userPageStore from './UserPageStore'
import replyStore from './ReplyStore'
import tweetDetailStore from './TweetDetailStore'

export default combineReducers({
  loginStore,
  tweetsStore,
  sugestedUserStore,
  loginFormStore,
  signupFormStore,
  followerStore,
  userPageStore,
  replyStore,
  tweetDetailStore
})
