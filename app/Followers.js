import React from 'react'
import UserCard from './UserCard'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'

class Followers extends React.Component{

  constructor(props){
    super(props)
    console.log(props);
    this.state={
      users: []
    }
  }


  componentWillMount(){
    this.findUsers(this.props.profile.userName,this.props.route.tab)
  }

  componentWillReceiveProps(props){
    this.findUsers(props.profile.userName,props.route.tab)
  }

  findUsers(username, type){
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

Followers.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Followers;
