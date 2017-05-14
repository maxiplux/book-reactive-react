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

    APIInvoker.invokeGET('/secure/' + type, response => {
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
    //
    let cards = this.state.users.map(x => {
      return (
        <div className="col-xs-12 col-sm-6" key={x._id}>
          <UserCard user={x} />
        </div>
      )
    })
    return(
      <section>
        <div className="container-fluid">
          <div className="row">
              {cards}
          </div>
        </div>
      </section>
    )
  }
}
export default Followers;
