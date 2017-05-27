import React from 'react'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import { browserHistory, Link, Router } from 'react-router';

class Login extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      username: "",
      password: ""
    }
  }

  handleInput(e){
    let field = e.target.name
    let value = e.target.value


    if(field === 'username'){
      value = value.replace(' ','').replace('@','').substring(0, 15)
      this.setState(update(this.state,{
        [field] : {$set: value}
      }))
    }

    this.setState(update(this.state,{
      [field] : {$set: value}
    }))
  }

  login(e){
    e.preventDefault()

    let request = {
    	"username": this.state.username,
    	"password": this.state.password
    }

    APIInvoker.invokePOST('/login',request, response => {
      console.log(response);
      if(response.ok){
        window.localStorage.setItem("token", response.token)
        window.localStorage.setItem("username", response.profile.userName)
        //browserHistory.push('/');
        window.location = '/';
      }else{
        this.refs.submitBtnLabel.innerHTML = response.message
        this.refs.submitBtnLabel.className = 'shake animated'
      }
    },error => {
      console.log("Error en la autenticación");
    })
  }

  render(){

    return(
      <div id="signup">
        <div className="container" >
          <div className="row">
            <div className="col-xs-12">
            </div>
          </div>
        </div>
        <div className="signup-form">
          <form onSubmit={this.login.bind(this)}>
            <h1>Iniciar sesión en Twitter</h1>

            <input type="text" value={this.state.username} placeholder="usuario" name="username" id="username" onChange={this.handleInput.bind(this)}/>
            <label ref="usernameLabel" id="usernameLabel" htmlFor="username"></label>

            <input type="password" id="passwordLabel" value={this.state.password} placeholder="Contraseña" name="password" onChange={this.handleInput.bind(this)}/>
            <label ref="passwordLabel"  htmlFor="passwordLabel"></label>

            <button className="btn btn-primary btn-lg " id="submitBtn" onClick={this.login.bind(this)}>Regístrate</button>
            <label ref="submitBtnLabel" id="submitBtnLabel" htmlFor="submitBtn" className="shake animated hidden "></label>
            <p className="bg-danger user-test">Crea un usuario o usa el usuario <strong>test/test</strong></p>
            <p>¿No tienes una cuenta? <Link to="/signup">Registrate</Link> </p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
