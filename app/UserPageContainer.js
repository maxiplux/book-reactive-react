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
    APIInvoker.invokeGET('/profile/' + this.props.params.user, response => {
      if(response.ok){
        this.setState(response.body);
      }
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
