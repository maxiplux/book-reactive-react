import React from 'react'
import Profile from './Profile'
import TweetsContainer from './TweetsContainer'
import SuggestedUser from './SuggestedUser'


class UserPage extends React.Component{

  render(){
    let bannerStyle = {
      backgroundImage: 'url(' + this.props.profile.banner + ')'
    }

    return(
      <div id="user-page" className="app-container">
        <header className="user-header">
          <div className="user-banner" style={bannerStyle}/>
          <div className="user-summary">
            <div className="container-fluid">
              <div className="row">
                <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3 col-lg-push-1 col-lg-3" >
                </div>
                <div className="col-xs-12 col-sm-8 col-md-push-1 col-md-7 col-lg-push-1 col-lg-4">
                  <ul className="user-summary-menu">
                    <li>
                      <a href="#">
                        <p className="summary-label">TWEETS</p>
                        <p className="summary-value">982</p>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <p className="summary-label">ME GUSTA</p>
                        <p className="summary-value">250</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-fluid">
          <div className="row">
            <div className="hidden-xs col-sm-4 col-md-push-1 col-md-3 col-lg-push-1 col-lg-3" >
              <aside id="user-info">
                <div className="user-avatar">
                  <img src={this.props.profile.avatar} />
                </div>
                <p className="user-info-name">{this.props.profile.name}</p>
                <p className="user-info-username">@{this.props.profile.userName}</p>
                <p className="user-info-description">{this.props.profile.description}</p>
              </aside>
            </div>

            <div className="col-xs-12 col-sm-8 col-md-push-1 col-md-7 col-lg-push-1 col-lg-4">
              <TweetsContainer profile={this.props.profile}/>
            </div>

            <div className="hidden-xs hidden-sm hidden-md col-lg-push-1 col-lg-3">
              <SuggestedUser/>
            </div>
          </div>
        </div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>
    )
  }
}
export default UserPage;
