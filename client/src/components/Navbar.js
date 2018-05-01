import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { Icon } from 'react-materialize';

const Navbar = (props) => {

  return <nav>
    <div className="nav-wrapper" id="navbarTop">
      <Link to="/" className="brand-logo">
        ShowFlow
          </Link>
      <ul id="nav-mobile" className="right">
        <li>
          <Link to={`/search/${props.query}`} className='searchKey'>
            <Icon className="white-text" type="submit">
              search
            </Icon>
          </Link>
        </li>
        <li>
          <input className="white-text" title="Search" type="text" id="search" placeholder='Search' onChange={props.handleSearchTerm} />
        </li>
        <li>
          <Link to="/home" className="white-text">
          <Icon className="white-text">
              home
            </Icon>
          </Link>
        </li>
        <li>
          <Link to="/home" className="white-text">
          {true && <Icon className="white-text">
              notifications
            </Icon>}
          {false && <Icon className="white-text">
              notifications_active
          </Icon>}
          </Link>
        </li>
        <li>
          <Link to={`/profile/${props.userId}`} className="white-text">
          <Icon className="white-text">
              account_circle
            </Icon>
              </Link>
        </li>
        <li>
          <a onClick={props.handleLogOut} className="white-text">
          <Icon className="white-text" type="submit">
              power_settings_new
            </Icon>
              </a>
        </li>
      </ul>
    </div>
  </nav>;
};

export default Navbar;