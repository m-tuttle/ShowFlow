import React from "react";
import { Navbar, NavItem, Icon, Input } from 'react-materialize';
import "./Header.css";

const Header = props => (
  <Navbar brand="ShowFlow" className="white" right>
      <NavItem href="#"><Input className="black-text" label="Search" validate><Icon className="black-text">search</Icon></Input></NavItem>
      <NavItem href='#'><Icon className="black-text">home</Icon></NavItem>
      <NavItem href='#'><Icon className="black-text">notifications</Icon></NavItem>
      <NavItem href='#'><Icon className="black-text">power_settings_new</Icon></NavItem>
  </Navbar>
);

export default Header;

