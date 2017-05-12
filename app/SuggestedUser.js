import React from 'react'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router';

class SuggestedUser extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      load: false
    }
  }

  componentWillMount(){
    APIInvoker.invokeGET('/secure/suggestedUsers', response => {
      if(!response.ok){
        console.log(response);
      }else{
        this.setState({
          load: true,
          users: response.body
        })
      }
    },error => {
      console.log("Error al actualizar el perfil");
    })
  }

  render(){

    let users = null

    if(this.state.load){
      users = this.state.users.map(x => { return (
        <div className="sg-item" key={x._id}>
          <div className="su-avatar">
            <img src={x.avatar} alt="Juan manuel"/>
          </div>
          <div className="sg-body">
            <div>
              <Link to={"/" + x.userName}>
                <span className="sg-name">{x.name}</span>
                <span className="sg-username">@{x.userName}</span>
              </Link>
            </div>
            <button className="btn btn-primary btn-sm"><i className="fa fa-user-plus" aria-hidden="true"></i>  Seguir</button>
          </div>
        </div>
      )
    })
    }



    return(
      <aside id="suggestedUsers" className="twitter-panel">
        <span className="su-title">A quién seguir</span>
        {users}
      </aside>
    )
  }
}
export default SuggestedUser;
