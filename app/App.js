import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Link  } from "react-router";
import TwitterContainer from './TwitterContainer'
import UserPageContainer from './UserPageContainer'
import TweetDetail from './TweetDetail'
import Signup from './Signup'
import Login from './Login'
// var createBrowserHistory = require('history/createBrowserHistory')
var createHashHistory = require('history/createHashHistory')



// render(<UserPageContainer/>, document.getElementById('root'));
//render(<TwitterContainer/>, document.getElementById('root'));

render((
  <Router history={ browserHistory }>
    <Route path="/"  component={TwitterContainer}>
      <Route path="/:user/:tweet" component={TweetDetail}/>
    </Route>
    <Route path="/signup" component={Signup}/>
    <Route path="/login" component={Login}/>
    <Route path="/:user" component={UserPageContainer}>
      <Route path="/:user/:tweet" component={TweetDetail}/>
    </Route>
  </Router>
), document.getElementById('root'));
