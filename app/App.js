import React, {Component} from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";
import TwitterContainer from './TwitterContainer'
import UserPage from './UserPage'

//render(<AppContainer/>, document.getElementById('root'));


render((
  <Router history={ browserHistory }>
    <Route path="/"  component={TwitterContainer}/>
    <Route path="/:user"  component={UserPage}/>
  </Router>
  ), document.getElementById('root'));
