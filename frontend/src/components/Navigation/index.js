import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux'
import DynamicSearch from '../DynamicSearch';
function Navigation({ setSignIn, setSignUp }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    let search;
    let sessionLogo;
    let sessionLinks;
    if (sessionUser) {
        search = (
            <input className='search-bar' placeholder='Search'></input>
        )

        sessionLogo = (
            <>
                <img src={require('./images/soundcloud.png')} />
            </>
        )
        sessionLinks = (
            <>
                <NavLink className='navbar-link' to='/try-pro'>Try Pro</NavLink>
                <NavLink className='navbar-link' to='/upload'>Upload</NavLink>
                <ProfileButton user={sessionUser} />
                <i className="fa-solid fa-ellipsis"></i>
            </>
        );
    } else {
        search = (
            <DynamicSearch className='search-bar unauth' placeholder='Search for artists, bands, tracks, and podcasts' />
        )
        sessionLogo = (
            <>
                <img src={require('./images/soundcloud1.png')} />
            </>
        )
        sessionLinks = (
            <>
                <button className='navbar-signin-button' to="/login" onClick={() => setSignIn(true)}>Sign In</button>
                <button className='navbar-create-button' to="/signup" onClick={() => setSignUp(true)}>Create Account</button>
                <NavLink className='navbar-upload-button' to='/upload'>Upload</NavLink>
            </>
        );
    }

    return (
        <div className='nav-bar'>
            {sessionLogo}
            <NavLink className='navbar-link-home' exact to="/">Home</NavLink>
            <NavLink className='navbar-link-about' to='/about'>About</NavLink>
            <NavLink className='navbar-link-discover' to='/library'>Library</NavLink>
            <div className='header-search'>
                <form className='header-search-form'>
                    {search}
                </form>
            </div>
            {sessionLinks}
        </div>
    );
}

export default Navigation;