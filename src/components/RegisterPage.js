import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// one letter in lower and upper cases, one digit, one special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PHONE_REGEX = /^\d{11}$/;
const NAME_REGEX = /^[a-zA-Z ]+$/;

const SignUpPage = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    // whether we have a focus on this particular field or not
    const [userFocus, setUserFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [fstName, setFstName] = useState('');
    const [validFstName, setValidFstName] = useState(false);
    const [fstNameFocus, setFstNameFocus] = useState(false);

    const [sndName, setSndName] = useState('');
    const [validSndName, setValidSndName] = useState(false);
    const [sndNameFocus, setSndNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //setting focus when a component loads
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // useEffect hook
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setValidFstName(NAME_REGEX.test(fstName));
    }, [fstName])

    useEffect(() => {
        setValidSndName(NAME_REGEX.test(sndName));
    }, [sndName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhoneNumber(PHONE_REGEX.test(phoneNumber));
    }, [phoneNumber])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd, fstName, sndName, email, phoneNumber]);
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = NAME_REGEX.test(fstName);
        const v4 = NAME_REGEX.test(sndName);
        const v5 = EMAIL_REGEX.test(email);
        const v6 = PHONE_REGEX.test(phoneNumber);

        if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/users",
                JSON.stringify({
                    username: user,
                    password: pwd,
                    firstName: fstName,
                    lastName: sndName,
                    email: email,
                    phoneNumber: phoneNumber
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.headers);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
            setFstName('');
            setSndName('');
            setEmail('');
            setPhoneNumber('');
            navigateLogin();

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="text-center m-5-auto">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h2>Join the AuctiON</h2>
            <h5>Create your personal account</h5>
            {/* action="/home" */}
            <form onSubmit={handleSubmit}>
                <p>
                    <label htmlFor="username">Username</label> <br />
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                </p>
                <p>
                    <label htmlFor="password">Password</label> <br />
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters:
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </p>
                </p>
                <p>
                    <label htmlFor="confirm_pwd">Confirm Password </label> <br />
                    {/* <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Must match the first password input field.
                    </p>
                </p>
                <p>
                    <label htmlFor="name">First name</label> <br />
                    <input
                        type="text"
                        id="name"
                        onChange={(e) => setFstName(e.target.value)}
                        value={fstName}
                        aria-invalid={validFstName ? "false" : "true"}
                        aria-describedby="namenote"
                        onFocus={() => setFstNameFocus(true)}
                        onBlur={() => setFstNameFocus(false)}
                    />
                    <p id="namenote" className={fstNameFocus && !validFstName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Only characters are allowed.<br />
                    </p>
                </p>
                <p>
                    <label htmlFor="surname">Second name</label> <br />
                    <input
                        type="text"
                        id="surname"
                        onChange={(e) => setSndName(e.target.value)}
                        value={sndName}
                        aria-invalid={validSndName ? "false" : "true"}
                        aria-describedby="surnamenote"
                        onFocus={() => setSndNameFocus(true)}
                        onBlur={() => setSndNameFocus(false)}
                    />
                    <p id="surnamenote" className={sndNameFocus && !validSndName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Only characters are allowed.<br />
                    </p>
                </p>
                <p>
                    <label htmlFor="email">Email</label><br />
                    <input
                        type="text"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                </p>
                <p>
                    <label htmlFor="phone">Phone number</label><br />
                    <input
                        type="text"
                        id="phone"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        value={phoneNumber}
                        onFocus={() => setPhoneFocus(true)}
                        onBlur={() => setPhoneFocus(false)}
                    />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    {/* id="sub_btn" type="submit" */}
                    <button id="sub_btn" type="submit" disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>
                        Register</button>
                </p>
                <p>
                    Have an account?<br />
                    <button id="sign_btn" onClick={navigateLogin}>Sign in</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
export default SignUpPage;
