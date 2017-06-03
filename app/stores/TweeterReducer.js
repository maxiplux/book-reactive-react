import { combineReducers } from 'redux'
import loginStore from './loginStore'
import tweetsStore from './TweetStore'

export default  combineReducers({
  loginStore,
  tweetsStore
})
