import React from 'react'
import { Link } from 'react-router';

class Profile extends React.Component{
  constructor(){
    super(...arguments)
    this.state = {}
  }


  render(){
    let bannerStyle = {
      backgroundImage: (this.props.profile.banner!=null ? 'url('+this.props.profile.banner +')' : 'none')
    }
    return(
      <aside id="profile" className="twitter-panel">
        <div className="profile-banner">
          <Link to={"/" + this.props.profile.userName} className="profile-name" style={bannerStyle}/>
        </div>
        <div className="profile-body">
          <img className="profile-avatar" src={this.props.profile.avatar}/>
          <Link to={"/" + this.props.profile.userName} className="profile-name">
            {this.props.profile.name}
          </Link>
          <Link to={"/" + this.props.profile.userName} className="profile-username">
            @{this.props.profile.userName}
          </Link>
        </div>
      </aside>
    )
  }
}
export default Profile;
