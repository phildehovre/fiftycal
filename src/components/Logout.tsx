import React, { useEffect } from 'react'

function Logout() {
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
        })
    }, [])


    return (


        <div>Logout</div>
    )
}

export default Logout