import React from 'react'
import { Link } from 'react-router';

class Toolbar extends React.Component{
  constructor(props){
    super(props)
    this.state= {}
  }

  render(){

    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <span className="visible-xs bs-test">XS</span>
        <span className="visible-sm bs-test">SM</span>
        <span className="visible-md bs-test">MD</span>
        <span className="visible-lg bs-test">LG</span>

        <div className="container-fluid">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <ul id="menu">
                <li id="tbHome" className={this.props.selected === 'home' ? "selected" : ""}>
                  <Link to="/">
                    <p className="menu-item"><i className="fa fa-home menu-item-icon" aria-hidden="true"></i>  <span className="hidden-xs hidden-sm">Inicio</span></p>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default Toolbar;
