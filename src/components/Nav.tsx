import React, { useEffect, useState } from 'react'
import SupabaseLogin from '../components/SupabaseLogin';
import SupabaseSignOut from '../components/SupabaseSignOut'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'



function Nav() {

    const session = useSession(); //tokens, when session exists, we have a user
    const { isLoading } = useSessionContext()



    return (
        <div>
            {isLoading &&
                <h1>Loading...</h1>
            }
            {
                session
                    ? <SupabaseSignOut />
                    : <SupabaseLogin />
            }
        </div>
    )
}

export default Nav