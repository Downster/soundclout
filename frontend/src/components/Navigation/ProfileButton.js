import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };

    return (
        <>
            <div className="nav-stuff">
                <div className="user-profile" onClick={openMenu}>
                    <img className='user-image' src={user.imageUrl} alt='user' />
                    <p className="profile-name">{user.username}</p>
                    <i className="fa-solid fa-angle-down"></i>
                </div>
                {showMenu && (
                    <div className="user-dropdown">
                        <ul className="profile-dropdown">
                            <li>{user.email}</li>
                            <li>
                                <button onClick={logout}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileButton;