import React, {Component} from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, browserHistory, Link, IndexRoute  } from "react-router";
import TwitterContainer from './TwitterContainer'
import UserPage from './UserPage'
import TweetDetail from './TweetDetail'
import Signup from './Signup'
import Login from './Login'
import TwitterApp from './TwitterApp'
import Followers from './Followers'
import Followings from './Followings'
import MyTweets from './MyTweets'
import reducer from './stores/TweeterReducer'
import { createLogger } from 'redux-logger'

var createBrowserHistory = require('history/createBrowserHistory')


const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

export const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render((
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Router component={TwitterApp} path="/">
        <Route path="/signup" component={Signup}/>
        <Route path="/login" component={Login}/>

        <Route path="/:user" component={UserPage} >
          <IndexRoute component={MyTweets} tab="tweets" />
          <Route path="followers" component={Followers} tab="followers"/>
          <Route path="following" component={Followings} tab="followings"/>
          <Route path=":tweet" component={TweetDetail}/>
        </Route>

        {/* <Route path="/:user/:tweet" component={TweetDetail}/> */}
        {/* <Route path="*" component={Login} status={404}/> */}
      </Router>
    </Router>
  </Provider>
), document.getElementById('root'));
