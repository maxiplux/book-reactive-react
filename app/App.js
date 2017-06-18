import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Link, IndexRoute  } from "react-router";
import UserPage from './UserPage'
import TweetDetail from './TweetDetail'
import Signup from './Signup'
import Login from './Login'
import TwitterApp from './TwitterApp'
import Followers from './Followers'
import MyTweets from './MyTweets'
import Followings from './Followings'

var createBrowserHistory = require('history/createBrowserHistory')

render((
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
    </Router>
  </Router>
), document.getElementById('root'));
