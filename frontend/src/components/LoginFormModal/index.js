// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal({ setSignIn, uploadDenied }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const result = await dispatch(sessionActions.login({ credential, password }))
        setErrors(result.errors)
    }
    const closeModal = () => {
        if (uploadDenied) {
            history.push('/')
        }
        setSignIn(false)
    }

    const demoLogin = async (e) => {
        const user = {
            credential: 'demo@user.io',
            password: 'Password123!'
        }
        const result = await dispatch(sessionActions.login(user))
        setSignIn(false)
    }

    return (
        <div className='modal'>
            <button className="modal-close" onClick={closeModal}><i class="fa-solid fa-xmark"></i></button>

            <div className='modal-container-sign-in'>
                <form onSubmit={handleSubmit} className='sign-in-form'>
                    <ul>
                        {errors && errors.map((error, idx) => <li key={idx} className='error-text'>{error}</li>)}
                    </ul>
                    <input className='sign-in-input'
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        placeholder='Email'
                    />

                    <input
                        className='sign-in-input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                    />
                    <button className='log-in-button' type="submit">Log In</button>
                </form>
                <button className='log-in-button-demo' onClick={(e) => demoLogin(e)}>Demo User</button>
            </div>
        </div >
    );
}

export default LoginFormModal;