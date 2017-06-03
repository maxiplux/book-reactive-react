import {
  LOAD_TWEETS
} from './const'

import APIInvoker from '../utils/APIInvoker'
import { browserHistory } from 'react-router'


//Services
export const relogin = () => (dispatch,getState) => {

  let token = window.localStorage.getItem("token")
  if(token == null){
    dispatch(loginFail())
    browserHistory.push('/login');
  }else{
    APIInvoker.invokeGET('/secure/relogin', response => {
      window.localStorage.setItem("token", response.token)
      window.localStorage.setItem("username", response.profile.userName)
      dispatch(loginSuccess( response.profile ))
    },error => {
      console.log("Error al autenticar al autenticar al usuario " );
      window.localStorage.removeItem("token")
      window.localStorage.removeItem("username")
      browserHistory.push('/login');
    })
  }
}

export const getTweet = (username, onlyUserTweet) => (dispatch, getState) => {
  APIInvoker.invokeGET('/tweets' + (onlyUserTweet  ? "/" + username : ""), response => {
    dispatch(loadTweetsSuccess(response.body))
  },error => {
    console.log("Error al cargar los Tweets");
  })
}



//Actions
const loginSuccess = profile => ({
  type: "LOGIN_SUCCESS",
  profile: profile
})

const loginFail = () => ({
  type: "LOGIN_SUCCESS",
  profile: null
})

const loadTweetsSuccess = tweets => ({
  type: LOAD_TWEETS,
  tweets: tweets
})
