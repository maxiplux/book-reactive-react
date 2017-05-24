import React from 'react'
import Tweet from './Tweet'
import Reply  from './Reply'
import update from 'react-addons-update'
import APIInvoker from "./utils/APIInvoker"
import PropTypes from 'prop-types'

class TweetsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tweets: []
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.profile.userName !== this.props.profile.userName){
      let username = this.props.profile.userName
      let onlyUserTweet = this.props.onlyUserTweet
      this.loadTweets(username, onlyUserTweet)
    }
  }

  componentWillMount(){
    let username = this.props.profile.userName
    let onlyUserTweet = this.props.onlyUserTweet
    this.loadTweets(username, onlyUserTweet)
  }

  loadTweets(username, onlyUserTweet){
    APIInvoker.invokeGET('/tweets' + (onlyUserTweet  ? "/" + username : ""), response => {
      if(response.ok){
        this.setState({
          tweets: response.body
        })
      }else{
        console.log(response)
      }

    },error => {
      console.log("Error al cargar los Tweets");
    })
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
        <If condition={this.state.tweets != null}>
          <For each="tweet" of={this.state.tweets}>
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


export default TweetsContainer;
