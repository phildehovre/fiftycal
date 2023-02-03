import React, { useContext, useEffect, useState } from 'react'
import SupabaseLogin from '../components/SupabaseLogin';
import SupabaseSignOut from '../components/SupabaseSignOut'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'
import { Link } from 'react-router-dom'
import './Nav.scss'
import { TemplateContext } from '../contexts/TemplateContext';



function Nav() {

    const session = useSession(); //tokens, when session exists, we have a user
    const { isLoading } = useSessionContext()
    const { setSelectedTemplateId } = useContext(TemplateContext)



    return (
        <div className='nav-ctn'>
            <div className='btn-ctn'>
                <Link to='/' onClick={() => setSelectedTemplateId('')}>Home</Link>
                <Link to='/new-template'>Template</Link>
                {session && <>
                    <Link to='/dashboard'>Dashboard</Link>
                </>
                }

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