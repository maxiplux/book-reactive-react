import React from 'react'
import update from 'react-addons-update'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import APIInvoker from './utils/APIInvoker'
import Followers from './Followers'
import { Link } from 'react-router'
import MyTweets from './MyTweets'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class UserPage extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      edit: false,
      profile:{
        name: "",
        description: "",
        avatar: null,
        banner: null,
        userName: ""
      }
    }
  }

  componentWillMount(){
    let user = this.props.params.user || window.localStorage.getItem("username")
    APIInvoker.invokeGET('/profile/' + user, response => {
      if(response.ok){
        this.setState({
          edit:false,
          profile: response.body
        });
      }
      console.log(response)
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  imageSelect(e){
    let id = e.target.id
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    if(file.size > 1240000){
      alert('La imagen supera el máximo de 1MB')
      return
    }

    reader.onloadend = () => {
      if(id == 'bannerInput'){
        this.setState(update(this.state,{
          profile: {
            banner: {$set: reader.result}
          }
        }))
      }else{
        this.setState(update(this.state,{
          profile: {
            avatar: {$set: reader.result}
          }
        }))
      }
    }
    reader.readAsDataURL(file)
  }

  handleInput(e){
    let id = e.target.id
    this.setState(update(this.state,{
      profile: {
        [id]: {$set: e.target.value}
      }
    }))
  }

  cancelEditMode(e){
    let currentState = this.state.currentState
    this.setState(update(this.state,{
      edit: {$set: false},
      profile: {$set: currentState}
    }))
  }

  changeToEditMode(e){
    if(this.state.edit){
      let request = {
        username: this.state.profile.userName,
        name: this.state.profile.name,
        description: this.state.profile.description,
        avatar: this.state.profile.avatar,
        banner: this.state.profile.banner
      }

      APIInvoker.invokePUT('/secure/profile', request, response => {
        if(response.ok){
          this.setState(update(this.state,{
            edit: {$set: false}
          }))
        }
      },error => {
        console.log("Error al actualizar el perfil");
      })
    }else{
      let currentState = this.state.profile
      this.setState(update(this.state,{
        edit: {$set: true},
        currentState: {$set: currentState}
      }))
    }
  }

  follow(e){
    let request = {
      followingUser: this.props.params.user
    }
    APIInvoker.invokePOST('/secure/follow', request, response => {
      if(response.ok){
        this.setState(update(this.state,{
          profile:{
            follow: {$set: !response.unfollow}
          }
        }))
      }
    },error => {
      console.log("Error al actualizar el perfil");
    })
  }

  render(){
    let bannerStyle = {
      backgroundImage: 'url(' + (this.state.profile.banner == null ? this.state.profile.banner : this.state.profile.banner) + ')'
    }
    let childs = this.props.children && React.cloneElement(this.props.children, { profile: this.state.profile })

    return(
      <div id="user-page" className="app-container">
        <header className="user-header">
          <div className="user-banner" style={bannerStyle}>
            <If condition={this.state.edit}>
              <div>
                <label htmlFor="bannerInput" className="btn select-banner">
                  <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                  <p>Cambia tu foto de encabezado</p>
                </label>
                <input href="#" className="btn" accept=".gif,.jpg,.jpeg,.png" type="file" onChange={this.imageSelect.bind(this)} id="bannerInput" />
              </div>
            </If>
          </div>
          <div className="user-summary">
            <div className="container-fluid">
              <div className="row">
                <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3 col-lg-push-1 col-lg-3" >
                </div>
                <div className="col-xs-12 col-sm-8 col-md-push-1 col-md-7 col-lg-push-1 col-lg-7">
                  <ul className="user-summary-menu">
                    <li className={this.props.route.tab === 'tweets' ? 'selected':''}>
                      <Link to={"/" + this.state.profile.userName}>
                        <p className="summary-label">TWEETS</p>
                        <p className="summary-value">{this.state.profile.tweetCount}</p>
                      </Link>
                    </li>
                    <li className={this.props.route.tab === 'followings' ? 'selected':''}>
                      <Link to={"/" + this.state.profile.userName + "/following" }>
                        <p className="summary-label">SIGUIENDO</p>
                        <p className="summary-value">{this.state.profile.following}</p>
                      </Link>
                    </li>
                    <li className={this.props.route.tab === 'followers' ? 'selected':''}>
                      <Link to={"/" + this.state.profile.userName + "/followers" }>
                        <p className="summary-label">SEGUIDORES</p>
                        <p className="summary-value">{this.state.profile.followers}</p>
                      </Link>
                    </li>
                  </ul>
                  {this.state.profile.userName === window.localStorage.getItem("username") ? <button className="btn btn-primary  edit-button" onClick={this.changeToEditMode.bind(this)}  >{this.state.edit ? "Guardar" : "Editar perfil"}</button>: null }
                  <If condition={this.state.profile.follow != null && this.state.profile.userName !== window.localStorage.getItem("username")} >
                    <button className="btn edit-button" onClick={this.follow.bind(this)} >
                      {this.state.profile.follow
                        ? (<span><i className="fa fa-user-times" aria-hidden="true"></i> Siguiendo</span>)
                        : (<span><i className="fa fa-user-plus" aria-hidden="true"></i> Seguir</span>)
                      }
                    </button>
                  </If>
                  {this.state.edit ? <button className="btn edit-button" onClick={this.cancelEditMode.bind(this)} >Cancelar</button> : null}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container-fluid">
          <div className="row">
            <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3 col-lg-push-1 col-lg-3" >
              <aside id="user-info">
                <div className="user-avatar">
                  <Choose>
                    <When condition={this.state.edit} >
                      <div className="avatar-box">
                        <img src={this.state.profile.avatar == null ? this.state.profile.avatar : this.state.profile.avatar} />
                        <label htmlFor="avatarInput" className="btn select-avatar">
                          <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                          <p>Foto</p>
                        </label>
                        <input href="#" className="btn" type="file" accept=".gif,.jpg,.jpeg,.png" onChange={this.imageSelect.bind(this)} id="avatarInput" />
                      </div>
                    </When>
                    <Otherwise>
                      <div className="avatar-box">
                        <img src={this.state.profile.avatar == null ? this.state.profile.avatar : this.state.profile.avatar} />
                      </div>
                    </Otherwise>
                  </Choose>
                </div>
                <Choose>
                  <When condition={this.state.edit} >
                    <div className="user-info-edit">
                      <input maxLength="20" type="text" value={this.state.profile.name} onChange={this.handleInput.bind(this)} id="name"/>
                      <p className="user-info-username">@{this.state.profile.userName}</p>
                      <textarea  maxLength="180" value={this.state.profile.description} onChange={this.handleInput.bind(this)} id="description" />
                    </div>
                  </When>
                  <Otherwise>
                    <div>
                      <p className="user-info-name">{this.state.profile.name}</p>
                      <p className="user-info-username">@{this.state.profile.userName}</p>
                      <p className="user-info-description">{this.state.profile.description}</p>
                    </div>
                  </Otherwise>
                </Choose>
              </aside>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-7 col-md-push-1 col-lg-7">
              {childs}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserPage;
