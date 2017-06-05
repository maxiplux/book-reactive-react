import { combineReducers } from 'redux'
import loginStore from './loginStore'
import tweetsStore from './TweetStore'
import sugestedUserStore from './SugestedUserStore'
import loginFormStore from './LoginFormStore'
import signupFormStore from './SignupFormStore'
import followerStore from './FollowerStore'
import userPageStore from './UserPageStore'

export default combineReducers({
  loginStore,
  tweetsStore,
  sugestedUserStore,
  loginFormStore,
  signupFormStore,
  followerStore,
  userPageStore
})
