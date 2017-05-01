import React from "react"
import APIInvoker from "./utils/APIInvoker"
import TwitterDashboard from './TwitterDashboard'
import Toolbar from './Toolbar'
import TweetDetail from "./TweetDetail"

class TwitterContainer extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      name: "",
      _id: ""
    }
  }

  componentWillMount(){
    console.log("WillMount");
    APIInvoker.invokeGET('/resources/users/rsuarez.json', response => {
      this.setState(response);
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
