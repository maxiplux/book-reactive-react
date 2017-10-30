import {LOAD_TWEETS} from './actions/const'
import React from 'react'
import Tweet from './Tweet'
import Reply  from './Reply'
import { connect } from 'react-redux'
import update from 'react-addons-update'
import APIInvoker from "./utils/APIInvoker"
import PropTypes from 'prop-types'
import { getTweet, addNewTweet } from './actions/Actions'

class TweetsContainer extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    let username = this.props.state.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet

    if( (onlyUserTweet && username != '') || !onlyUserTweet){
      this.props.getTweet(username, onlyUserTweet)
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.state.profile != null && prevProps.state.profile.userName !== this.props.state.profile.userName){
      this.props.getTweet(this.props.state.profile.userName, this.props.onlyUserTweet)
    }
  }

  addNewTweet(newTweet){
    this.props.addNewTweet(newTweet)
  }

  render(){

    let operations = {
      addNewTweet: this.addNewTweet.bind(this)
    }

    return (
      <main className="twitter-panel">
        <Choose>
          <When condition={this.props.onlyUserTweet} >
            <div className="tweet-container-header">
              Tweets
            </div>
          </When>
          <Otherwise>
            <Reply profile={this.props.state.profile} operations={operations}/>
          </Otherwise>
        </Choose>
        <If condition={this.props.state.tweets != null}>
          <For each="tweet" of={this.props.state.tweets}>
            <Tweet key={tweet._id} tweet={tweet}/>
          </For>
        </If>
      </main>
    )
  }
}

TweetsContainer.propTypes = {
  onlyUserTweet: PropTypes.bool,
  profile: PropTypes.object
}

TweetsContainer.defaultProps = {
  onlyUserTweet: false
}

const mapStateToProps = (state) => {
  return {
    state: {
      profile: state.userPageReducer.profile,
      tweets: state.tweetsReducer.tweets
    }
  }
}


export default connect(mapStateToProps, {getTweet, addNewTweet})(TweetsContainer);
