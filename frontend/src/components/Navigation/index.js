import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <NavLink className='navbar-link' to='/try-pro'>Try Pro</NavLink>
                <NavLink className='navbar-link' to='/upload'>Upload</NavLink>
                <ProfileButton user={sessionUser} />
                <i className="fa-solid fa-ellipsis"></i>
            </>
        );
    } else {
        sessionLinks = (
            <>
                <NavLink className='navbar-link' to="/login">Sign In</NavLink>
                <NavLink className='navbar-link' to="/signup">Create Account</NavLink>
                <NavLink className='navbar-link' to='/upload'>Upload</NavLink>
            </>
        );
    }

    return (
        <div className='nav-bar'>
            <img src={require('./images/soundcloud.png')} />
            <NavLink className='navbar-link-home' exact to="/">Home</NavLink>
            <NavLink className='navbar-link-about' to='/about'>About</NavLink>
            <div className='header-search'>
                <form className='header-search-form'>
                    <input className='search-bar' placeholder='Search'></input>
                </form>
            </div>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;