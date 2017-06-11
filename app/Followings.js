import React from 'react'
import UserCard from './UserCard'
import APIInvoker from './utils/APIInvoker'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {connect} from 'react-redux'
import {findFollowersFollowings, resetFollowersFollowings} from  './actions/Actions'

class Followings extends React.Component{

  constructor(props){
    super(props)
  }


  componentWillMount(){
    this.props.findFollowersFollowings(this.props.params.user,'followings')
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevProps.route.tab !== this.props.route.tab){
  //     this.props.findFollowersFollowings(this.props.params.user,this.props.route.tab)
  //   }
  // }

  componentWillUnmount(){
    this.props.resetFollowersFollowings()
  }

  render(){

    return(
      <section>
        <div className="container-fluid no-padding">
          <div className="row no-padding">
            <CSSTransitionGroup
              transitionName="card"
              transitionEnterTimeout={500}
              transitionAppear={false}
              transitionAppearTimeout={0}
              transitionLeave={false}
              transitionLeaveTimeout={0}>
              <For each="user" of={ this.props.state.users }>
                <div className="col-xs-12 col-sm-6 col-lg-4" key={this.props.route.tab + "-" + user._id}>
                  <UserCard user={user} />
                </div>
              </For>
            </CSSTransitionGroup>
          </div>
        </div>
      </section>
    )
  }
}

Followings.propTypes = {
  profile: PropTypes.object
}

const mapStateToProps = (state) => {
  return {
    state: state.followerStore
  }
}

export default connect(mapStateToProps, {findFollowersFollowings, resetFollowersFollowings})(Followings);