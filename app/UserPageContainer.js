import React from 'react'
import Toolbar from './Toolbar'
import UserPage from './UserPage'
import APIInvoker from "./utils/APIInvoker"

class UserPageContainer extends React.Component{

  constructor(){
    super(...arguments);
    this.state = {
      name: "",
      _id: ""
    }
  }

  componentWillMount(){
    console.log("WillMount");
    APIInvoker.invokeGET('/public/users/' + this.props.params.user + '.json', response => {
      this.setState(response);
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  render(){
    return(
      <div>
        <Toolbar selected="inicio"/>
        <UserPage profile={this.state}/>
      </div>
    )
  }
}
export default UserPageContainer;
