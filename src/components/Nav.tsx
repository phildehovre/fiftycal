import React, { useEffect, useState } from 'react'
import SupabaseLogin from '../components/SupabaseLogin';
import SupabaseSignOut from '../components/SupabaseSignOut'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'
import { Link } from 'react-router-dom'
import './Nav.scss'



function Nav() {

    const session = useSession(); //tokens, when session exists, we have a user
    const { isLoading } = useSessionContext()



    return (
        <div className='nav-ctn'>
            <div className='btn-ctn'>
                <Link to='/'>Home</Link>
                <Link to='/new-template'>Template</Link>

                {
                    session
                        ? <SupabaseSignOut />
                        : <SupabaseLogin />
                }
            </div>
            {isLoading &&
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default Nav