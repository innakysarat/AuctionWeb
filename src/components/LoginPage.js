import React from 'react';
import '../App.css';
import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from 'axios';
import { Link, Route, Routes, useNavigate, Navigate } from 'react-router-dom';

const SignInPage = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    //const { setIsLogin } = useContext(Context);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    const navigateFeed = () => {
        navigate('/home');
    };

    // set a focus on a first input
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        // without it a form's default action is just reloading a login page
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/login",
                JSON.stringify({ username: user, password: pwd })
                ,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            ) 
            if (response.status == 200) {
                const userToken = response.headers.authorization;
                console.log(userToken);
                localStorage.setItem('token', userToken);
                //setAuth({ user, pwd, userToken });
                setAuth({ userToken });
                setUser('');
                setPwd('');
            }
            setSuccess(true);
            console.log('success');
            navigateFeed();
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                console.log(err.response)
                setErrMsg('Login Failed');
            }
            // set a focus on an error display
            // so that a screen reader can read the error's info
            errRef.current.focus();
        }
    }
    return (
        <div className="text-center m-5-auto">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2>Sign in to the AuctiON</h2>
            <form action="/home" onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br />
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="on"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br />
                    <input
                        type="password"
                        id="password"
                        autoComplete="on"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </p>
                <p>
                    <button id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/home">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
export default SignInPage;


