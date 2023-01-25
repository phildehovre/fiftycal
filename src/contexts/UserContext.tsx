import React from 'react'
import { useState } from 'react'

export const UserContext = React.createContext({})

function UserContextProvider(props: any) {

    const [user, setUser] = useState({})
    const values = {
        user,
        handleUserChange
    }


    function handleUserChange(userObject: any) {
        setUser(userObject)
        console.log(userObject)
    }

    return (

        <UserContext.Provider value={values}>
            {props.children}
        </UserContext.Provider>

    )
}

export default UserContextProvider