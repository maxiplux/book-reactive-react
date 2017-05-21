import React from 'react'
import APIInvoker from "./utils/APIInvoker"
import Toolbar from './Toolbar'
import { browserHistory } from 'react-router'
import TwitterDashboard from './TwitterDashboard'

class TwitterApp extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      load: false,
      profile: null
    }
  }

  componentWillMount(){
    this.loadProfile()
  }

  loadProfile(){
    let token = window.sessionStorage.getItem("token")
    if(token == null){
      browserHistory.push('/login');
      this.setState({
        load: true,
        profile: null
      })
    }else{
      APIInvoker.invokeGET('/secure/relogin', response => {
        if(response.ok){
          this.setState({
            load: true,
            profile: response.profile
          });
          window.sessionStorage.setItem("token", response.token)
          window.sessionStorage.setItem("username", response.profile.userName)
        }else{
          window.sessionStorage.removeItem("token")
          window.sessionStorage.removeItem("username")
          browserHistory.push('/login');
        }
      },error => {
        console.log("Error al cargar los Tweets");
      })
    }
  }

  render(){

    return (
      <div id="mainApp">
        <Toolbar profile={this.state.profile} selected="home"/>
        <Choose>
          <When condition={!this.state.load}>
            <div className="tweet-detail">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
          </When>
          <When condition={this.props.children == null && this.state.profile != null}>
            <TwitterDashboard  profile={this.state.profile}/>
          </When>
          <Otherwise>
            {this.props.children}
          </Otherwise>
        </Choose>
        <div id="dialog"/>
      </div>
    )
  }
}
export default TwitterApp;
