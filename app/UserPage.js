import React from 'react'
import update from 'react-addons-update'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'
import APIInvoker from './utils/APIInvoker'


class UserPage extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {
      edit: false,
      profile:{
        name: "",
        description: "",
        avatar: null,
        banner: null
      }
    }
  }

  componentWillReceiveProps(props){
    this.setState(update(this.state,{
      profile:{
        name: {$set: props.profile.name},
        description: {$set: props.profile.description},
        avatar: {$set: props.profile.avatar},
        banner: {$set: props.profile.banner}
      }
    }))
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
    this.setState(update(this.state,{
      edit: {$set: false}
    }))
  }

  changeToEditMode(e){
    if(this.state.edit){
      let request = {
        username: this.props.profile.userName,
        name: this.state.profile.name,
        description: this.state.profile.description,
        avatar: this.state.profile.avatar,
        banner: this.state.profile.banner
      }

      APIInvoker.invokePUT('/secure/profile', request, response => {
        if(!response.ok){
          console.log(response);
        }else{
          this.setState(update(this.state,{
            edit: {$set: false}
          }))
        }
      },error => {
        console.log("Error al actualizar el perfil");
      })
    }else{
      this.setState(update(this.state,{
        edit: {$set: true}
      }))
    }
  }

  render(){
    let bannerStyle = {
      backgroundImage: 'url(' + (this.state.profile.banner == null ?this.props.profile.banner : this.state.profile.banner) + ')'
    }
    let selectBanner = null
    if(this.state.edit){
      selectBanner = (
        <div>
          <label htmlFor="bannerInput" className="btn select-banner">
            <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
            <p>Cambia tu foto de encabezado</p>
          </label>
          <input href="#" className="btn" accept=".gif,.jpg,.jpeg,.png" type="file" onChange={this.imageSelect.bind(this)} id="bannerInput" />
        </div>
      )
    }


    let selectAvatar = null
    if(this.state.edit){
      selectAvatar = (
        <div className="avatar-box">
          <img src={this.state.profile.avatar == null ? this.props.profile.avatar : this.state.profile.avatar} />
          <label htmlFor="avatarInput" className="btn select-avatar">
            <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
            <p>Foto</p>
          </label>
          <input href="#" className="btn" type="file" accept=".gif,.jpg,.jpeg,.png" onChange={this.imageSelect.bind(this)} id="avatarInput" />
        </div>
      )
    }else{
      selectAvatar = (
        <div className="avatar-box">
          <img src={this.state.profile.avatar == null ? this.props.profile.avatar : this.state.profile.avatar} />
        </div>
      )
    }

    let userDate = null
    if(this.state.edit){
      userDate = (
        <div className="user-info-edit">
          <input maxLength="20" type="text" value={this.state.profile.name} onChange={this.handleInput.bind(this)} id="name"/>
          <p className="user-info-username">@{this.props.profile.userName}</p>
          <textarea  maxLength="180" value={this.state.profile.description} onChange={this.handleInput.bind(this)} id="description" />
        </div>
      )
    }else{
      userDate = (
        <div>
          <p className="user-info-name">{this.props.profile.name}</p>
          <p className="user-info-username">@{this.props.profile.userName}</p>
          <p className="user-info-description">{this.props.profile.description}</p>
        </div>
      )
    }

    return(
      <div id="user-page" className="app-container">
        <header className="user-header">
          <div className="user-banner" style={bannerStyle}>
            {selectBanner}
          </div>
          <div className="user-summary">
            <div className="container-fluid">
              <div className="row">
                <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3 col-lg-push-1 col-lg-3" >
                </div>
                <div className="col-xs-12 col-sm-8 col-md-push-1 col-md-7 col-lg-push-1 col-lg-4">
                  <ul className="user-summary-menu">
                    <li>
                      <a href="#">
                        <p className="summary-label">TWEETS</p>
                        <p className="summary-value">{this.props.profile.tweetCount}</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <p className="summary-label">ME GUSTA</p>
                        <p className="summary-value">250</p>
                      </a>
                    </li>
                  </ul>
                  <button className="btn btn-primary  edit-button" onClick={this.changeToEditMode.bind(this)}  >{this.state.edit ? "Guardar" : "Editar perfil"}</button>
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
                  {selectAvatar}
                </div>
                {userDate}
              </aside>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-push-1 col-md-7 col-lg-push-1 col-lg-4">
              <TweetsContainer profile={this.props.profile} onlyUserTweet={true} />
            </div>
            <div className="hidden-xs hidden-sm hidden-md col-lg-push-1 col-lg-3">
              <SuggestedUser/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default UserPage;
