import React from 'react'

class Toolbar extends React.Component{
  constructor(){
    super(...arguments)
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
                <li className="selected">
                  <a href="#">
                    <p className="menu-item"><i className="fa fa-home menu-item-icon" aria-hidden="true"></i>  <span className="hidden-xs hidden-sm">Inicio</span></p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p className="menu-item"><i className="fa fa-bolt menu-item-icon" aria-hidden="true"></i>  <span className="hidden-xs hidden-sm">Momentos</span></p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p className="menu-item"><i className="fa fa-bell menu-item-icon" aria-hidden="true"></i>   <span className="hidden-xs hidden-sm">Notificaciones</span></p>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <p className="menu-item"><i className="fa fa-commenting menu-item-icon" aria-hidden="true"></i>   <span className="hidden-xs hidden-sm">Mensajes</span></p>
                  </a>
                </li>


              </ul>


            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default Toolbar
