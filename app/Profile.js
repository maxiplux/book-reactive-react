import React from 'react'

class Profile extends React.Component{
  constructor(){
    super(...arguments)
    this.state = {}
  }

  render(){
    let bannerStyle = {
      backgroundImage: 'url("https://pbs.twimg.com/profile_banners/562317715/1488694967/600x200")'
    }
    return(
      <aside id="profile" className="twitter-panel">
        <div className="profile-banner">
          <a href="#" style={bannerStyle}/>
        </div>
        <div className="profile-body">
          <img className="profile-avatar" src="https://pbs.twimg.com/profile_images/453553938285883392/o05pJ717_bigger.jpeg"/>
          <a href="#" className="profile-name">Oscar Blancarte</a>
          <a href="#" className="profile-username">@oscarjblancarte</a>
        </div>
      </aside>
    )
  }
}
export default Profile;
