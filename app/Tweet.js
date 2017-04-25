import React from 'react'

class Tweet extends React.Component{

  constructor(){
    super(...arguments)
    this.state={}
  }

  tweetClicked(){

  }

  componentDidMount(){
    console.log("didMount ==>");
  }


  render(){
    let tweetClass = this.props.tweet.isNew ? 'tweet fadeIn animated' : 'tweet'

    return (
        <article className={tweetClass} onClick={this.tweetClicked.bind(this)}>
          <div className="tweet-avatar">
            <i className="fa fa-user fa-3x" aria-hidden="true"></i>
          </div>

          <div className="tweet-body">
            <a href="#user" className="tweet-name-link">
              <span  className="tweet-name">{this.props.tweet._creator.name}</span>
            </a>
            <span className="tweet-username">@{this.props.tweet.date}</span>
            <span className="tweet-timeago"> - 5 min
            </span>
            <p>{this.props.tweet.message}</p>
          </div>

          <div className="tweet-footer">
            <a className="like-icon">
              <i className="fa fa-heart " aria-hidden="true"></i> 1
            </a>
            <a className="reply-icon">
              <i className="fa fa-reply " aria-hidden="true"></i> 1
            </a>
          </div>
        </article>
    )
  }
}
export default Tweet;
