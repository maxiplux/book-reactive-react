import React from 'react'
import UserCard from './UserCard'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

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
    this.setState({
      tab: props.route.tab,
      users: []
    })
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
            <CSSTransitionGroup
              transitionName="card"
              transitionEnterTimeout={500}
              transitionAppear={false}
              transitionAppearTimeout={0}
              transitionLeave={false}
              transitionLeaveTimeout={0}>
              <For each="user" of={ this.state.users }>
                <div className="col-xs-12 col-sm-6 col-lg-4" key={this.state.tab + "-" + user._id}>
                  <UserCard user={user} />
                </div>
              </For>
            </CSSTransitionGroup>
          </div>
        </div>
      </section>
    )
  }
}

Followers.propTypes = {
  profile: PropTypes.object
}

export default Followers;
