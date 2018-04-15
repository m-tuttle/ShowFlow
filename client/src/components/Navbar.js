import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { Icon, Autocomplete } from 'react-materialize';

const Navbar = (props) => {

    return <nav>
        <div className="nav-wrapper" id="navbarTop">
          <Link to="/" className="brand-logo">
            ShowFlow
          </Link>
          <ul id="nav-mobile" className="right">
            <li>
              <Link to={`/search/${props.query}`}>
                <Icon className="white-text" type="submit">
                  search
                </Icon>
              </Link>
            </li>
            <li>
              <Autocomplete className="white-text" title="Search" type="text" id="search" onChange={props.handleSearchTerm} data={props.shows} />
            </li>
            <li>
              <Link to="/home" className="white-text">
                Home
              </Link>
            </li>
            <li>
              <Link to={`/profile/${props.userId}`} className="white-text">
                Profile
              </Link>
            </li>
            <li>
              <a onClick={props.handleLogOut} className="white-text">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </nav>;
};

export default Navbar;