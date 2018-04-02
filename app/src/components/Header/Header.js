import React from "react";
import { Navbar, Row, Col } from 'react-materialize';
import "./Header.css";

const Header = props => (
    <Navbar className="header">
        <div className="nav-wrapper">
        <Row>
          <Col s={4} ><a className="brand-logo black-text left">ShowFlow</a></Col>
          <Col s={4} ><div className="input-field center">
          <i className="material-icons prefix">search</i>
          <input id="icon_prefix" type="text" className="validate black-text"></input>
          <label for="icon_prefix">Search</label>
        </div></Col>
          <Col s={4} >
            
          <ul className="right hide-on-med-and-down">
            <li><a className="black-text" href="#!"><i className="material-icons prefix">home</i></a></li>
            <li><a className="black-text" href="#!"><i className="material-icons prefix">notifications</i></a></li>
            <li><a className="black-text" href="#!"><i className="material-icons prefix">person</i></a></li>
            <li><a className="black-text" href="#!"><i className="material-icons prefix">power_settings_new</i></a></li>
          </ul>
          </Col>
        </Row>
        </div>
    </Navbar>
);

export default Header;