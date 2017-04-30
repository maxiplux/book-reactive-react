import React from 'react'
import update from 'react-addons-update'
import { Link } from 'react-router';
import TweetDetail from './TweetDetail'
import { browserHistory } from 'react-router';


class Tweet extends React.Component{

  constructor(props){
    super(props)
    this.state = props.tweet
  }


  handleLike(e){
    e.preventDefault()
    if(this.state.liked){
      let newState = update(this.state,{
        liked : {$set: false},
        likeCounter : {$apply : (x) => {return --x}}
      })
      this.setState(newState)
    }else{
      let newState = update(this.state,{
        liked : {$set: true},
        likeCounter : {$apply : (x) => {return ++x}}
      })
      this.setState(newState)
    }
  }

  handleClick(e){
    if(e.target.getAttribute("data-ignore-onclick")){
      return
    }
    let url = "/" + this.state._creator.userName + "/" + this.state._id
    browserHistory.push(url);
    let tweetId = e.target.id;
  }

  render(){
    let tweetClass = null
    if(this.props.detail){
      tweetClass = 'tweet detail'
    }else{
      tweetClass = this.state.isNew ? 'tweet fadeIn animated' : 'tweet'
    }

    let likeClass = this.state.liked ? 'like-icon liked' : 'like-icon'

    let img = null
    if(this.state.image != null){
      img = (<img className="tweet-img" src={this.state.image}/>)
    }

    return (
        <article  className={tweetClass} onClick={this.props.detail ? '' : this.handleClick.bind(this)} id={"tweet-" + this.state._id}>
          <img src={this.state._creator.avatar} className="tweet-avatar" />
          <div className="tweet-body">
            <div className="tweet-user">
              <Link to={"/" + this.state._creator.userName} >
                <span  className="tweet-name" data-ignore-onclick>{this.state._creator.name}</span>
              </Link>
              <span className="tweet-username">@{this.state._creator.userName}</span>
            </div>
            <p className="tweet-message">{this.state.message}</p>
            {img}
            <div className="tweet-footer">
              <a className={likeClass} onClick={this.handleLike.bind(this)} data-ignore-onclick>
                <i className="fa fa-heart " aria-hidden="true" data-ignore-onclick></i> {this.state.likeCounter}
              </a>
              <a className="reply-icon" data-ignore-onclick>
                <i className="fa fa-reply " aria-hidden="true" data-ignore-onclick></i> 1
              </a>
            </div>
          </div>
          <div id={"tweet-detail-" + this.state._id}/>
        </article>
    )
  }
}
export default Tweet;
