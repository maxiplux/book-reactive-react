import React from 'react'
import Reply from './Reply'
import Tweet from './Tweet'
import APIInvoker from './utils/APIInvoker'
import update from 'react-addons-update'
import { browserHistory } from 'react-router';

class TweetDetail extends React.Component{

  constructor(){
    super(...arguments)
  }

  componentWillMount(){
    APIInvoker.invokeGET('/resources/tweet-detail.json', response => {
      this.setState( response)
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }

  addNewTweet(newTweet){
    let oldState = this.state;
    let newState = update(this.state, {
      replys: {$splice: [[0, 0, newTweet]]}
    })
    this.setState(newState)
    // TODO
  }

  handleClose(){
    browserHistory.goBack()
  }

  render(){
    let tweetDetails = null

    if(this.state == null){
      tweetDetails = (<div className="tweet-detail">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
      </div>)
    }else{
      let img = null;
      if(this.state.image != null){
        img = (<img src={this.state} alt={this.state.name} />)
      }

      let replys = null
      if(this.state.replys != null){
        replys = this.state.replys.map(reply => {
          return <li className="tweet-details-reply" key={reply._id}>
            <Tweet tweet={reply} detail={true}/>
          </li>
        })
      }

      let operations = {
        addNewTweet: this.addNewTweet.bind(this)
      }

      tweetDetails = (
        <div className="tweet-detail">
          <i className="fa fa-times fa-2x tweet-close" aria-hidden="true" onClick={this.handleClose.bind(this)}/>
          <Tweet tweet={this.state} detail={true} />
          <div className="tweet-details-reply">
            <Reply profile={this.state._creator} operations={operations} key={"detail-" + this.state._id} newReply={false}/>
          </div>
          <ul className="tweet-detail-responses">
            {replys}
          </ul>
        </div>
      )
    }

    return(
      <div className="fullscreen">
        {tweetDetails}
      </div>
    )
  }
}
export default TweetDetail;
