import React from 'react'
import Reply from './Reply'
import Tweet from './Tweet'
import update from 'react-addons-update'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'

class TweetReply extends React.Component{

  constructor(props){
    super(props)

  }

  componentWillMount(){
    let tweetId = this.props.tweetId

  }

  handleClose(){
    $( "html" ).removeClass( "modal-mode");
    $( "#dialog" ).html( "");
  }

  addNewTweet(newTweet){
    let request = {
      tweetParent: this.props.tweet._id,
      message: newTweet.message,
      image: newTweet.image
    }

    APIInvoker.invokePOST('/secure/tweet', request, response => {
      this.handleClose()
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  render(){

    let operations = {
      addNewTweet: this.addNewTweet.bind(this)
    }

    return(
      <div className="fullscreen">
        <div className="tweet-detail">
          <i className="fa fa-times fa-2x tweet-close" aria-hidden="true" onClick={this.handleClose.bind(this)}/>
          <Tweet tweet={this.props.tweet} detail={true} />
          <div className="tweet-details-reply">
            <Reply profile={this.props.profile} operations={operations}  newReply={false}/>
          </div>
        </div>
      </div>
    )
  }
}

TweetReply.propTypes = {
  tweet: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  tweetId: PropTypes.object.isRequired
}

export default TweetReply;
