import React from 'react'
import update from 'react-addons-update'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import APIInvoker from './utils/APIInvoker'
import { Link } from 'react-router'
import MyTweets from './MyTweets'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { connect } from 'react-redux'
import { getUserProfile, chageToEditMode, cancelEditMode, updateUserPageForm, userPageImageUpload, userPageSaveChanges, followUser, relogin} from './actions/Actions'

class UserPage extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    let username = this.props.params.user || window.localStorage.getItem("username")
    this.props.getUserProfile(username)
  }

  componentDidUpdate(prevProps, prevState){
    let username = this.props.params.user || window.localStorage.getItem("username")
    if(prevProps.params.user!= null && prevProps.params.user !== this.props.params.user){
      this.props.getUserProfile(username)
      $( "html" ).removeClass( "modal-mode");
      console.log("scroll ==>");
      $(window).scrollTop(0)
    }
  }

  imageSelect(e){
    e.preventDefault()
    this.props.userPageImageUpload(e)
  }

  handleInput(e){
    this.props.updateUserPageForm(e)
  }

  cancelEditMode(e){
    this.props.cancelEditMode()
  }

  changeToEditMode(e){
    if(this.props.state.edit){
      this.props.userPageSaveChanges()
      this.props.relogin()
    }else{
      this.props.chageToEditMode()
    }
  }

  follow(e){
    this.props.followUser(this.props.params.user)
    this.props.relogin()
  }

  render(){
    let bannerStyle = {
      backgroundImage: 'url(' + (this.props.state.profile.banner == null ? this.props.state.profile.banner : this.props.state.profile.banner) + ')'
    }
    //let childs = this.props.children && React.cloneElement(this.props.children, { profile: this.props.state.profile })

    let tabName = this.props.children.props.route.tab
    return(
      <div id="user-page" className="app-container">
        <header className="user-header">
          <div className="user-banner" style={bannerStyle}>
            <If condition={this.props.state.edit}>
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
                    <li className={tabName === 'tweets' ? 'selected':''}>
                      <Link to={"/" + this.props.state.profile.userName}>
                        <p className="summary-label">TWEETS</p>
                        <p className="summary-value">{this.props.state.profile.tweetCount}</p>
                      </Link>
                    </li>
                    <li className={tabName === 'followings' ? 'selected':''}>
                      <Link to={"/" + this.props.state.profile.userName + "/following" }>
                        <p className="summary-label">SIGUIENDO</p>
                        <p className="summary-value">{this.props.state.profile.following}</p>
                      </Link>
                    </li>
                    <li className={tabName === 'followers' ? 'selected':''}>
                      <Link to={"/" + this.props.state.profile.userName + "/followers" }>
                        <p className="summary-label">SEGUIDORES</p>
                        <p className="summary-value">{this.props.state.profile.followers}</p>
                      </Link>
                    </li>
                  </ul>
                  {this.props.state.profile.userName === window.localStorage.getItem("username") ? <button className="btn btn-primary  edit-button" onClick={this.changeToEditMode.bind(this)}  >{this.props.state.edit ? "Guardar" : "Editar perfil"}</button>: null }
                  <If condition={this.props.state.profile.follow != null && this.props.state.profile.userName !== window.localStorage.getItem("username")} >
                    <button className="btn edit-button" onClick={this.follow.bind(this)} >
                      {this.props.state.profile.follow
                        ? (<span><i className="fa fa-user-times" aria-hidden="true"></i> Siguiendo</span>)
                        : (<span><i className="fa fa-user-plus" aria-hidden="true"></i> Seguir</span>)
                      }
                    </button>
                  </If>
                  {this.props.state.edit ? <button className="btn edit-button" onClick={this.cancelEditMode.bind(this)} >Cancelar</button> : null}
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
                    <When condition={this.props.state.edit} >
                      <div className="avatar-box">
                        <img src={this.props.state.profile.avatar == null ? this.props.state.profile.avatar : this.props.state.profile.avatar} />
                        <label htmlFor="avatarInput" className="btn select-avatar">
                          <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
                          <p>Foto</p>
                        </label>
                        <input href="#" className="btn" type="file" accept=".gif,.jpg,.jpeg,.png" onChange={this.imageSelect.bind(this)} id="avatarInput" />
                      </div>
                    </When>
                    <Otherwise>
                      <div className="avatar-box">
                        <img src={this.props.state.profile.avatar == null ? this.props.state.profile.avatar : this.props.state.profile.avatar} />
                      </div>
                    </Otherwise>
                  </Choose>
                </div>
                <Choose>
                  <When condition={this.props.state.edit} >
                    <div className="user-info-edit">
                      <input maxLength="20" type="text" value={this.props.state.profile.name} onChange={this.handleInput.bind(this)} id="name"/>
                      <p className="user-info-username">@{this.props.state.profile.userName}</p>
                      <textarea  maxLength="180" value={this.props.state.profile.description} onChange={this.handleInput.bind(this)} id="description" />
                    </div>
                  </When>
                  <Otherwise>
                    <div>
                      <p className="user-info-name">{this.props.state.profile.name}</p>
                      <p className="user-info-username">@{this.props.state.profile.userName}</p>
                      <p className="user-info-description">{this.props.state.profile.description}</p>
                    </div>
                  </Otherwise>
                </Choose>
              </aside>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-7 col-md-push-1 col-lg-7">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state.userPageStore
  }
}

export default connect(mapStateToProps,{getUserProfile, chageToEditMode, cancelEditMode, updateUserPageForm, userPageImageUpload, userPageSaveChanges, followUser, relogin})(UserPage);
