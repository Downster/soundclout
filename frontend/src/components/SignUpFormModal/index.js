import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignupFormModal({ setSignUp }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            const result = await dispatch(sessionActions.signup({ email, username, password }))
            setErrors(result.errors)
        } else {
            setErrors(["Passwords don't match"])
        }
    };
    const closeModal = () => {
        setSignUp(false)
    }

    return (
        <div className="modal" >
            <button className="modal-close" onClick={closeModal}><i class="fa-solid fa-xmark"></i></button>
            <div className="modal-container">

                <form onSubmit={handleSubmit} className='sign-up-form'>
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <input
                        className="sign-in-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                    <input
                        className="sign-in-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                    />
                    <input
                        className="sign-in-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                    <input
                        className="sign-in-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm password"
                    />
                    <button className='log-in-button' type="submit">Sign Up</button>
                </form>
            </div>
        </div>

    );
}

export default SignupFormModal;