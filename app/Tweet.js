import React from 'react'
import update from 'react-addons-update'
import { Link } from 'react-router'
import TweetDetail from './TweetDetail'
import { browserHistory } from 'react-router'
import APIInvoker from './utils/APIInvoker'
import TweetReply from './TweetReply'
import { render } from 'react-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {likeTweet, likeTweetDetail} from './actions/Actions'
import { Provider } from 'react-redux'
import {store} from './App'

class Tweet extends React.Component{

  constructor(props){
    super(props)
    //this.state = props.tweet
  }

  // componentWillMount(){
  //
  // }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.tweet != null && prevProps.tweet._id !==  this.props.tweet._id){
      this.setState(this.props.tweet)
    }
  }

  handleLike(e){
    e.preventDefault()

    if(this.props.detail){
      this.props.likeTweetDetail(this.props.tweet._id, !this.props.tweet.liked)
    }else{
      this.props.likeTweet(this.props.tweet._id, !this.props.tweet.liked)
    }



    // let request = {
    //   tweetID: this.props.tweet._id,
    //   like: !this.props.tweet.liked
    // }
    //
    // APIInvoker.invokePOST('/secure/like', request, response => {
    //   if(response.ok){
    //     let newState = update(this.props.tweet,{
    //       likeCounter : {$set: response.body.likeCounter},
    //       liked: {$apply: (x) => {return !x}}
    //     })
    //     this.setState(newState)
    //   }
    // },error => {
    //   console.log("Error al cargar los Tweets");
    // })
  }

  componentWillUnmount(){
    console.log('componentWillUnmount ==>' );
  }

  handleReply(e){
    $( "html" ).addClass( "modal-mode");
    e.preventDefault()

    console.log(store);
    if(!this.props.detail){
      // render(<TweetReply tweet={this.props.tweet} profile={this.props.tweet._creator} />, document.getElementById('dialog'))

      render(
        <Provider store={ store }>
          <TweetReply tweet={this.props.tweet} profile={this.props.tweet._creator} />
        </Provider>, document.getElementById('dialog'))
    }
  }

  handleClick(e){
    if(e.target.getAttribute("data-ignore-onclick")){
      return
    }
    let url = "/" + this.props.tweet._creator.userName + "/" + this.props.tweet._id
    browserHistory.push(url);
    let tweetId = e.target.id;
  }

  render(){
    let tweetClass = null
    if(this.props.detail){
      tweetClass = 'tweet detail'
    }else{
      tweetClass = this.props.tweet.isNew ? 'tweet fadeIn animated' : 'tweet'
    }
    return (

        <article  className={tweetClass} onClick={this.props.detail ? '' : this.handleClick.bind(this)} id={"tweet-" + this.props.tweet._id}>
          <If condition = {this.props.tweet._creator != null && this.props.tweet._creator.avatar != null} >
            <img src={this.props.tweet._creator.avatar} className="tweet-avatar" />
          </If>

          <div className="tweet-body">
            <div className="tweet-user">
              <Link to={"/" + this.props.tweet._creator.userName} >
                <span  className="tweet-name" data-ignore-onclick>{this.props.tweet._creator.name}</span>
              </Link>
              <span className="tweet-username">@{this.props.tweet._creator.userName}</span>
            </div>
            <p className="tweet-message">{this.props.tweet.message}</p>
            <If condition={this.props.tweet.image != null}>
              <img className="tweet-img" src={this.props.tweet.image}/>
            </If>
            <div className="tweet-footer">
              <a className={this.props.tweet.liked ? 'like-icon liked' : 'like-icon'} onClick={this.handleLike.bind(this)} data-ignore-onclick>
                <i className="fa fa-heart " aria-hidden="true" data-ignore-onclick></i> {this.props.tweet.likeCounter}
              </a>
              <If condition={!this.props.detail} >
                <a className="reply-icon" onClick={this.handleReply.bind(this)} data-ignore-onclick>
                  <i className="fa fa-reply " aria-hidden="true" data-ignore-onclick></i> {this.props.tweet.replys}
                </a>
              </If>
            </div>
          </div>
          <div id={"tweet-detail-" + this.props.tweet._id}/>
        </article>
    )
  }
}

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
  detail: PropTypes.bool
}

Tweet.defaultProps = {
  detail: false
}

const mapStateToProps = (state) => {
  return {}
}


export default connect(mapStateToProps, {likeTweet, likeTweetDetail})(Tweet);
