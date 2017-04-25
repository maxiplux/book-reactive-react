import React from "react"
import APIInvoker from "./utils/APIInvoker"
import TwitterDashboard from './TwitterDashboard'
import Toolbar from './Toolbar'

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
    APIInvoker.invokeGET('/public/data.json', response => {
      this.setState(response);
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  render(){
    return (
      <div>
        <Toolbar profile={this.state}/>
        <TwitterDashboard  profile={this.state}/>
      </div>

    )
  }
}
export default TwitterContainer;
