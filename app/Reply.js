import React from 'react'
import update from 'react-addons-update'
import config from '../config.js'

const uuidV4 = require('uuid/v4');

class Reply extends React.Component{

  constructor(){
    super(...arguments)
    this.state={
      focus: false,
      message: '',
      image: null
    }
  }

  handleChangeMessage(e){
    this.setState(update(this.state,{
      message: {$set: e.target.value}
    }))
  }

  handleMessageFocus(e){
    let newState = update(this.state,{
        focus: {$set: true}
    })
    this.setState(newState)
  }

  handleMessageFocusLost(e){
    if(this.state.message.length=== 0){
      this.reset();
    }
  }

  handleKeyDown(e){
    if(e.keyCode === 27){
      this.reset();
    }
  }

  reset(){
    let newState = update(this.state,{
        focus: {$set: false},
        message: {$set: ''},
        image: {$set:null}
    })
    this.setState(newState)

    this.refs.reply.blur();
  }

  newTweet(e){
    e.preventDefault();

    let tweet = {
      isNew: true,
      _id: uuidV4(),
      _creator: {
        _id: this.props.profile._id,
        name: this.props.profile.name,
        userName: this.props.profile.userName,
        avatar: this.props.profile.avatar
      },
      date: Date.now,
      message: this.state.message,
      image: this.state.image,
      liked: false,
      likeCounter: 0
    }

    this.props.operations.addNewTweet(tweet)
    this.reset();
  }

  imageSelect(e){
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if(file.size > 1240000){
      alert('La imagen supera el máximo de 1MB')
      return
    }

    reader.onloadend = () => {
      let newState = update(this.state,{
        image: {$set: reader.result}
      })
      this.setState(newState)
    }
    reader.readAsDataURL(file)
  }


  componentWillMount(){

  }

  render(){
    let randomID = uuidV4();

    return (
      <section className="reply">
        <If condition={this.props.profile!=null} >
          <img src={this.props.profile.avatar} className="reply-avatar" />
        </If>
        <div className="reply-body">
          <textarea
            ref="reply"
            name="message"
            type="text"
            maxLength = {config.tweets.maxTweetSize}
            placeholder="¿Qué está pensando?"
            className={this.state.focus ? 'reply-selected' : ''}
            value={this.state.message}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.handleMessageFocusLost.bind(this)}
            onFocus={this.handleMessageFocus.bind(this)}
            onChange={this.handleChangeMessage.bind(this)}
            />
            <If condition={this.state.image != null} >
              <div className="image-box"><img src={this.state.image}/></div>
            </If>

        </div>
        <div className={this.state.focus ? 'reply-controls' : 'hidden'}>
          <label htmlFor={"reply-camara-" + randomID} className={this.state.message.length===0 ? 'btn pull-left disabled' : 'btn pull-left'}>
            <i className="fa fa-camera fa-2x" aria-hidden="true"></i>
          </label>

          <input href="#" className={this.state.message.length===0 ? 'btn pull-left disabled' : 'btn pull-left'} accept=".gif,.jpg,.jpeg,.png" type="file" onChange={this.imageSelect.bind(this)} id={"reply-camara-" + randomID}>
          </input>

          <span ref="charCounter" className="char-counter">{config.tweets.maxTweetSize - this.state.message.length }</span>

          <button className={this.state.message.length===0 ? 'btn btn-primary disabled' : 'btn btn-primary '} onClick={this.newTweet.bind(this)}>
            <i className="fa fa-twitch" aria-hidden="true"></i>   Twittear
          </button>
        </div>
      </section>
    )
  }
}
export default Reply;
