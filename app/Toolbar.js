import React from 'react'

class Toolbar extends React.Component{
  constructor(){
    super(...arguments)
    this.state= {}
  }

  render(){
    return(
      <nav className="navbar navbar-default">
        <span className="visible-xs bs-test">XS</span>
        <span className="visible-sm bs-test">SM</span>
        <span className="visible-md bs-test">MD</span>
        <span className="visible-lg bs-test">LG</span>

        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </nav>
    )
  }
}
export default Toolbar
