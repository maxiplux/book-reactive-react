import React from 'react'
import APIInvoker from "./utils/APIInvoker"
import Toolbar from './Toolbar'
import { browserHistory } from 'react-router'
import TwitterDashboard from './TwitterDashboard'
import { connect } from 'react-redux'
import { relogin } from './actions/Actions'

class TwitterApp extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.props.relogin()
  }

  render(){
    return (
      <div id="mainApp">
        <Toolbar profile={this.props.profile} selected="home"/>
        <Choose>
          <When condition={!this.props.load}>
            <div className="tweet-detail">
              <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
          </When>
          <When condition={this.props.children == null && this.props.profile != null}>
            <TwitterDashboard  profile={this.props.profile}/>
          </When>
          <Otherwise>
            {this.props.children}
          </Otherwise>
        </Choose>
        <div id="dialog"/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    load: state.loginReducer.load,
    profile: state.loginReducer.profile
  }
}

export default connect(mapStateToProps, { relogin })(TwitterApp);
