import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to='/' className="brand-logo">ShowFlow</Link>
                <ul id="nav-mobile" className="right">
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
};

export default Navbar;