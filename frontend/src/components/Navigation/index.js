import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { useDispatch } from 'react-redux'
function Navigation({ isLoaded, setSignIn, setSignUp }) {
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
            <input className='search-bar unauth' placeholder='Search for artists, bands, tracks, and podcasts'></input>
        )
        sessionLogo = (
            <>
                <img src={require('./images/soundcloud1.png')} />
            </>
        )
        sessionLinks = (
            <>
                <button className='navbar-signin-button' to="/login" onClick={setSignIn}>Sign In</button>
                <button className='navbar-create-button' to="/signup" onClick={setSignUp}>Create Account</button>
                <button className='navbar-upload-button' to='/upload'>Upload</button>
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
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;