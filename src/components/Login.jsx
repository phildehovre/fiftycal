import React from 'react'
import './Login.scss'
import Section from './Section'

import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'


function Login() {

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const navigate = useNavigate();

    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password)
        navigate('/')
    };

    const handleSignupWithGoogle = async () => {
        signInWithPopup(auth, provider).then(() => {
            console.log(' Signed In')
            navigate('/calendar')
        })
    };

    return (
        <Section height='100vh'>
            <div className='login_form-ctn'>
                <h1>Log in</h1>
                <button className='login-btn' onClick={e => { handleSignupWithGoogle() }}>
                    Log in with
                    <FontAwesomeIcon icon={faGoogle} size='xl' />
                </button>
            </div>
        </Section >
    )
};

export default Login;