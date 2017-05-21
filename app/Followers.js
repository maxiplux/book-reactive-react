import React from 'react'
import UserCard from './UserCard'
import APIInvoker from './utils/APIInvoker'

class Followers extends React.Component{

  constructor(props){
    super(props)
    this.state={
      users: []
    }
  }

  componentWillReceiveProps(props){
    let type = this.props.type
    let username = this.props.profile.userName

    APIInvoker.invokeGET('/' + type + "/" + username, response => {
      if(response.ok){
          this.setState({
            users: response.body
          })
      }
    },error => {
      console.log("Error en la autenticación");
    })
  }

  render(){

    return(
      <section>
        <div className="container-fluid no-padding">
          <div className="row no-padding">
              <For each="user" of={ this.state.users }>
                <div className="col-xs-12 col-sm-6 col-lg-4" key={user._id}>
                  <UserCard user={user} />
                </div>
              </For>
          </div>
        </div>
      </section>
    )
  }
}
export default Followers;
