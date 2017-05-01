import React from 'react'
import Toolbar from './Toolbar'
import update from 'react-addons-update'

class Signup extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      username: "",
      password: "",
      description: "",
      avatar: "",
      banner: ""
    }
  }

  componentWillMount(){
    // APIInvoker.invokeGET('/resources/users/' + this.props.params.user + '.json', response => {
    //   this.setState(response);
    // },error => {
    //   console.log("Error al cargar los Tweets");
    // })
  }

  handleInput(e){
    let field = e.target.name
    let value = e.target.value

    if(field === 'username'){
      value = value.replace(' ','').replace('@','').substring(0, 15)
    }

    this.setState(update(this.state,{
      [field] : {$set: value}
    }))
  }

  validateUser(e){
    let username = e.target.value

    // APIInvoker.invokeGET('/resources/users/' + this.props.params.user + '.json', response => {
    //   this.setState(response);
    // },error => {
    //   console.log("Error al cargar los Tweets");
    // })


    if(username.length > 0 ){
      this.refs.usernameLabel.innerHTML = 'OK'

    }
  }


  signup(){
    if(!this.state.license){
      this.refs.submitBtnLabel.innerHTML = 'Acepte los términos de licencia'
      this.refs.submitBtnLabel.className = 'shake animated'

      return;
    }
    // APIInvoker.invokeGET('/resources/users/' + this.props.params.user + '.json', response => {
    //   this.setState(response);
    // },error => {
    //   console.log("Error al cargar los Tweets");
    // })
  }

  render(){

    return (
      <div id="signup">
        <Toolbar profile={this.state} />
        <div className="container" >
          <div className="row">
            <div className="col-xs-12">

            </div>
          </div>
        </div>
        <div className="signup-form">
          <h1>Únite hoy a Twitter</h1>
          <input type="text" value={this.state.username} placeholder="@usuario" name="username" id="username" onBlur={this.validateUser.bind(this)} onChange={this.handleInput.bind(this)}/>
          <label ref="usernameLabel" id="usernameLabel" htmlFor="username"></label>
          <input type="password" id="passwordLabel" value={this.state.password} placeholder="Contraseña" name="password" onChange={this.handleInput.bind(this)}/>
          <label ref="passwordLabel"  htmlFor="passwordLabel"></label>
          <input id="license" type="checkbox" value={this.state.license} name="license" onChange={this.handleInput.bind(this)} />
          <label htmlFor="license" >Acepto los terminos de licencia</label>
          <button className="btn btn-primary btn-lg " id="submitBtn" onClick={this.signup.bind(this)}>Regístrate</button>
          <label ref="submitBtnLabel" id="submitBtnLabel" htmlFor="submitBtn" className="shake animated hidden "></label>
          <p className="bg-danger user-test">Crea un usuario o usa el usuario <strong>test/test</strong></p>
        </div>
      </div>
    )
  }
}
export default Signup;
