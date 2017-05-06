import React from "react"
import APIInvoker from "./utils/APIInvoker"
import TwitterDashboard from './TwitterDashboard'
import Toolbar from './Toolbar'
import TweetDetail from "./TweetDetail"
import { browserHistory,Link } from 'react-router'

class TwitterContainer extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      name: "",
      _id: ""
    }
  }

  componentWillUpdate(){
  }

  componentWillMount(){
    this.loadProfile()
  }

  loadProfile(){
    console.log("WillMount");
    let user = window.sessionStorage.getItem("username")
    if(user == null){
      browserHistory.push('/login');
    }
    APIInvoker.invokeGET('/profile/' + user, response => {
      if(response.ok){
        this.setState(response.body);

      }else{
        //browserHistory.push('/login');
      }

    },error => {
      console.log("Error al cargar los Tweets");
    })

  }

  render(){
    return (
      <div>
        <Toolbar profile={this.state} selected="home"/>
        <TwitterDashboard  profile={this.state}/>
        {this.props.children}
        {/* <TweetDetail/> */}
        {/* {this.props.children == null ? <TwitterDashboard  profile={this.state}/> : this.props.children} */}

      </div>

    )
  }
}
export default TwitterContainer;
