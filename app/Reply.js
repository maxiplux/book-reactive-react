import React from 'react'
import update from 'react-addons-update'
import config from '../config.js'
const uuidV4 = require('uuid/v4');
import ReactTimeAgo from 'react-time-ago'

class Reply extends React.Component{

  constructor(){
    super(...arguments)
    this.state={
      focus: false,
      message: ''
    }
  }

  handleChangeMessage(e){
    this.setState({
      message: e.target.value
    })
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
      message: this.state.message
    }

    this.props.operations.addNewTweet(tweet)
    this.reset();
  }

  render(){
    let textareaStyles = this.state.focus ? 'reply-selected' : ''
    let controlStyles = this.state.focus ? 'reply-controls' : 'hidden'
    let buttonStyles = this.state.message.length===0 ? 'btn btn-primary disabled' : 'btn btn-primary '
    return (
      <section className="reply">
        <div className="reply-avatar">
          <i className="fa fa-user fa-2x" aria-hidden="true"></i>
        </div>
        <div className="reply-body">
          <textarea
            ref="reply"
            name="message"
            type="text"
            maxLength = {config.tweets.maxTweetSize}
            placeholder="¿Qué está pensando?"
            className={textareaStyles}
            value={this.state.message}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.handleMessageFocusLost.bind(this)}
            onFocus={this.handleMessageFocus.bind(this)}
            onChange={this.handleChangeMessage.bind(this)}
            />
        </div>
        <div className={controlStyles}>
          <span ref="charCounter" className="char-counter">{config.tweets.maxTweetSize - this.state.message.length }</span>
          <button className={buttonStyles} onClick={this.newTweet.bind(this)}>
            <i className="fa fa-twitch" aria-hidden="true"></i>   Twittear
          </button>
        </div>
      </section>
    )
  }
}
export default Reply;
