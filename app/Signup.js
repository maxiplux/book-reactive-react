import React from 'react'
import Toolbar from './Toolbar'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import { browserHistory,Link } from 'react-router'

class Signup extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      username: "",
      name:"",
      password: "",
      description: "",
      avatar: "",
      banner: "",
      userOk: false,
      license: false
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
    let type = e.target.type

    if(field === 'username'){
      value = value.replace(' ','').replace('@','').substring(0, 15)
      this.setState(update(this.state,{
        [field] : {$set: value}
      }))
    }else if(type === 'checkbox'){
      this.setState(update(this.state,{
        [field] : {$set: e.target.checked}
      }))

    }else{
      this.setState(update(this.state,{
        [field] : {$set: value}
      }))
    }
  }

  validateUser(e){
    let username = e.target.value
    APIInvoker.invokeGET('/usernameValidate/' + username, response => {
      if(response.ok){
        this.setState(update(this.state, {
          userOk: {$set: true}
        }))
        this.refs.usernameLabel.innerHTML = response.message
        this.refs.usernameLabel.className = 'fadeIn animated ok'
      }else{
        this.setState(update(this.state,{
          userOk: {$set: false}
        }))
        this.refs.usernameLabel.innerHTML = response.message
        this.refs.usernameLabel.className = 'fadeIn animated fail'
      }
    },error => {
      console.log("Error al cargar los Tweets");
    })


  }


  signup(){
    if(!this.state.license){
      this.refs.submitBtnLabel.innerHTML = 'Acepte los términos de licencia'
      this.refs.submitBtnLabel.className = 'shake animated'
      return
    }else if(!this.state.userOk){
      this.refs.submitBtnLabel.innerHTML = 'Favor de revisar su nombre de usuario'
      this.refs.submitBtnLabel.className = ''
      return
    }

    this.refs.submitBtnLabel.innerHTML = ''
    this.refs.submitBtnLabel.className = ''

    let request = {
    	"name": this.state.name,
    	"username": this.state.username,
    	"password": this.state.password
    }

    APIInvoker.invokePOST('/signup',request, response => {
      if(response.ok){
        browserHistory.push('/login');
      }else{
        this.refs.submitBtnLabel.innerHTML = response.error
        this.refs.submitBtnLabel.className = 'shake animated'
      }
    },error => {
      console.log("Error al cargar los Tweets");
    })
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

          <input type="text" value={this.state.name} placeholder="Nombre" name="name" id="name" onChange={this.handleInput.bind(this)}/>
          <label ref="nameLabel" id="nameLabel" htmlFor="name"></label>


          <input type="password" id="passwordLabel" value={this.state.password} placeholder="Contraseña" name="password" onChange={this.handleInput.bind(this)}/>
          <label ref="passwordLabel"  htmlFor="passwordLabel"></label>

          <input id="license" type="checkbox" ref="license" value={this.state.license} name="license" onChange={this.handleInput.bind(this)} />
          <label htmlFor="license" >Acepto los terminos de licencia</label>

          <button className="btn btn-primary btn-lg " id="submitBtn" onClick={this.signup.bind(this)}>Regístrate</button>
          <label ref="submitBtnLabel" id="submitBtnLabel" htmlFor="submitBtn" className="shake animated hidden "></label>
          <p className="bg-danger user-test">Crea un usuario o usa el usuario <strong>test/test</strong></p>
          <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link> </p>
        </div>
      </div>
    )
  }
}
export default Signup;
