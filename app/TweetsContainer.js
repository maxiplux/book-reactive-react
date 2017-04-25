import React from 'react'
import Tweet from './Tweet'
import Reply  from './Reply'
import update from 'react-addons-update'
import APIInvoker from "./utils/APIInvoker"

class TweetsContainer extends React.Component{
  constructor(){
    super(...arguments)
    this.state = {
      tweets: []
    }
  }

  componentWillMount(){
    APIInvoker.invokeGET('/public/tweets.json', response => {
      this.setState({
        tweets: response
      })
    },error => {
      console.log("Error al cargar los Tweets");
    })
  }


  addNewTweet(newTweet){
    console.log('addNewTweet ==> ');
    console.log(newTweet);
    let oldState = this.state;

    let newState = update(this.state, {
      tweets: {$splice: [[0, 0, newTweet]]}
    })

    //   tweets: {$push: [newTweet]}
    // })
    // this.setState(newState)

    // let newState = update(this.state,{
    //   tweets: {$push: [newTweet]}
    // })

    this.setState(newState)



    // TODO
  }

  render(){
    let tweets= ''
    if(this.state.tweets != null){
      tweets = this.state.tweets.map(x => {
        return <Tweet key={x._id} tweet={x}/>
      })
    }

    let operations = {
      addNewTweet: this.addNewTweet.bind(this)
    }

    return (
      <main className="twitter-panel">
        <Reply profile={this.props.profile} operations={operations}/>
        {tweets}
      </main>
    )
  }
}
export default TweetsContainer;
