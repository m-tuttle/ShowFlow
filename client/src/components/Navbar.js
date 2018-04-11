import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to='/' className="brand-logo">ShowFlow</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to='/search'><Icon className="black-text" type="submit">search</Icon>
                    </Link></li>
                    <li><input className="black-text" label="Search" type="text" id="search"></input></li>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;