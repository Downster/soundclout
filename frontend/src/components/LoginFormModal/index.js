// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormModal({ setSignIn }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

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
        setSignIn(false)
    }

    return (
        <div className='modal'>
            <button className="modal-close" onClick={closeModal}><i class="fa-solid fa-xmark"></i></button>

            <div className='modal-container'>

                <form onSubmit={handleSubmit} className='sign-in-form'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        Username or Email
                        <input
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default LoginFormModal;