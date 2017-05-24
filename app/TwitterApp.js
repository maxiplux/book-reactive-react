import React from 'react'
import APIInvoker from "./utils/APIInvoker"
import Toolbar from './Toolbar'
import { browserHistory } from 'react-router'
import TwitterDashboard from './TwitterDashboard'

class TwitterApp extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      load: false,
      profile: null
    }
  }

  componentWillMount(){
    this.loadProfile()
  }

  loadProfile(){
    let token = window.localStorage.getItem("token")
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
          window.localStorage.setItem("token", response.token)
          window.localStorage.setItem("username", response.profile.userName)
        }else{
          window.localStorage.removeItem("token")
          window.localStorage.removeItem("username")
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
