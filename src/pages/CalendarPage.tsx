import React, { useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../components/Login.scss'
import axios from 'axios'


function CalendarPage() {



    const auth = getAuth()
    const navigate = useNavigate()

    console.log(auth?.currentUser)

    const handleSignOut = async () => {
        signOut(auth).then(() => {
            navigate('/')
        })
    };

    return (
        <div>You have been Redirected to your calendar!
            <div className='login-btn' onClick={() => handleSignOut()}>Log out</div>
        </div>
    )
}

export default CalendarPage