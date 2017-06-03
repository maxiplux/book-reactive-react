import {LOAD_TWEETS} from './actions/const'
import React from 'react'
import Tweet from './Tweet'
import Reply  from './Reply'
import { connect } from 'react-redux'
import update from 'react-addons-update'
import APIInvoker from "./utils/APIInvoker"
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { getTweet } from './actions/Actions'

class TweetsContainer extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){
    let username = this.props.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet
    this.props.getTweet(username, onlyUserTweet);
  }

  addNewTweet(newTweet){
    let oldState = this.state;
    let newState = update(this.state, {
      tweets: {$splice: [[0, 0, newTweet]]}
    })

    this.setState(newState)

    //Optimistic Update
    APIInvoker.invokePOST('/secure/tweet',newTweet,  response => {
      if(!response.ok){
        this.setState(oldState)
      }else{
        this.setState(update(this.state,{
          tweets:{
            0 : {
              _id: {$set: response.tweet._id}
            }
          }
        }))
      }
    },error => {
      console.log("Error al cargar los Tweets");
    })
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
            <Reply profile={this.props.profile} operations={operations}/>
          </Otherwise>
        </Choose>
        <If condition={this.props.tweets != null}>
          <For each="tweet" of={this.props.tweets}>
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
    profile: state.loginStore.profile,
    tweets: state.tweetsStore.tweets
  }
}


export default connect(mapStateToProps, {getTweet})(TweetsContainer);
