import React, { useEffect, useState } from 'react'
import Login from '../components/Login'
import { gapi, loadAuth2 } from 'gapi-script'
import { useRef } from 'react';

function Homepage() {


    return (
        <div>
            <Login />
        </div>
    )
}

export default Homepage