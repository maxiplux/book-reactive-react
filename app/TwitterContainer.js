import React from "react"
import APIInvoker from "./utils/APIInvoker"
import TwitterDashboard from './TwitterDashboard'
import TweetDetail from "./TweetDetail"
import { browserHistory,Link } from 'react-router'

class TwitterContainer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      name: "",
      _id: ""
    }
  }

  componentWillMount(){
    let user = window.localStorage.getItem("username")
    if(user == null){
      browserHistory.push('/login');
    }
    APIInvoker.invokeGET('/profile/' + user, response => {
      if(response.ok){
        this.setState(response.body);
      }
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  render(){
    return (
      <div>
        <TwitterDashboard  profile={this.state}/>
        {this.props.children}
      </div>
    )
  }
}
export default TwitterContainer;
