import React from 'react'
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import '../components/Login.scss'


function CalendarPage() {

    const auth = getAuth()
    const navigate = useNavigate()

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