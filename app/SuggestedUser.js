import React from 'react'

class SuggestedUser extends React.Component{

  constructor(){
    super(...arguments)
    this.state = {}
  }

  render(){
    return(
      <aside id="suggestedUsers" className="twitter-panel">
        <span className="su-title">A quién seguir</span>
        <div className="sg-item">
          <div className="su-avatar">
            <img src="/resources/avatars/1.jpg" alt="Juan manuel"/>
          </div>
          <div className="sg-body">
            <div>
              <span className="sg-name">Andres Perez</span>
              <span className="sg-username">@aperez</span>
            </div>
            <button className="btn btn-primary btn-sm"><i className="fa fa-user-plus" aria-hidden="true"></i>  Seguir</button>
          </div>
        </div>
        <div className="sg-item">
          <div className="su-avatar">
            <img src="/resources/avatars/2.jpg" alt="Juan manuel"/>
          </div>
          <div className="sg-body">
            <div>
              <span className="sg-name">Claudia Rocha</span>
              <span className="sg-username">@crocha</span>
            </div>
            <button className="btn btn-primary btn-sm"><i className="fa fa-user-plus" aria-hidden="true"></i>  Seguir</button>
          </div>
        </div>
        <div className="sg-item">
          <div className="su-avatar">
            <img src="/resources/avatars/3.jpg" alt="Juan manuel"/>
          </div>
          <div className="sg-body">
            <div>
              <span className="sg-name">Emmanuel Suarez</span>
              <span className="sg-username">@esuerez</span>
            </div>
            <button className="btn btn-primary btn-sm"><i className="fa fa-user-plus" aria-hidden="true"></i>  Seguir</button>
          </div>
        </div>
      </aside>
    )
  }
}
export default SuggestedUser;
