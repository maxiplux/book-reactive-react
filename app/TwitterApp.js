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
    let view = null

    if(!this.state.load){
      view = (<div className="tweet-detail">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      </div>)
    }else {
      if(this.props.children == null && this.state.profile != null){
        view = (<TwitterDashboard  profile={this.state.profile}/>)
      }else{
        view = (this.props.children)
      }
    }

    return (
      <div id="mainApp">
        <Toolbar profile={this.state.profile} selected="home"/>
        {view}
        <div id="dialog"/>
      </div>

    )
  }
}
export default TwitterApp;
