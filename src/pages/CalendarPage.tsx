import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext';
import Calendar from '../components/Calendar'
import axios from 'axios'


function CalendarPage() {

    const context = useContext(UserContext)




    return (
        <div>
            {/* <Logout /> */}
            {/* <Calendar /> */}



        </div>
    )
}

export default CalendarPage