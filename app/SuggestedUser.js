import React from 'react'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router';
import { getSugestedUsers } from './actions/Actions'
import { connect } from 'react-redux'

class SuggestedUser extends React.Component{

  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    this.props.getSugestedUsers()
    // APIInvoker.invokeGET('/secure/suggestedUsers', response => {
    //   if(response.ok){
    //     this.setState({
    //       load: true,
    //       users: response.body
    //     })
    //   }else{
    //     console.error(response);
    //   }
    // },error => {
    //   console.log("Error al actualizar el perfil");
    // })
  }

  render(){
    return(
      <aside id="suggestedUsers" className="twitter-panel">
        <span className="su-title">A quién seguir</span>
        <If condition={this.props.load} >
          <For each="user" of={this.props.users}>
            <div className="sg-item" key={user._id}>
              <div className="su-avatar">
                <img src={user.avatar} alt="Juan manuel"/>
              </div>
              <div className="sg-body">
                <div>
                  <a href={"/" + user.userName}>
                    <span className="sg-name">{user.name}</span>
                    <span className="sg-username">@{user.userName}</span>
                  </a>
                </div>
                <a href={"/" + user.userName} className="btn btn-primary btn-sm"><i className="fa fa-user-plus" aria-hidden="true"></i>  Ver perfil</a>
              </div>
            </div>
          </For>
        </If>
      </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    load: state.sugestedUserReducer.load,
    users: state.sugestedUserReducer.users
  }
}
export default connect(mapStateToProps, {getSugestedUsers})(SuggestedUser);
