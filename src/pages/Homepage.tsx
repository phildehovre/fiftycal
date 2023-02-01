import React, { useEffect, useState } from 'react'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'
import CreateEvent from '../components/CreateEvent';
import Hero from '../components/Hero';
import TemplatesList from '../components/TemplatesList';



function Homepage() {

    const session = useSession(); //tokens, when session exists, we have a user

    const { isLoading } = useSessionContext()

    return (
        <div>
            {
                session
                    ? <TemplatesList />
                    : <Hero />
            }
        </div>
    )
}

export default Homepage