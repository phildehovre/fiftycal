import React, { useEffect } from 'react'
import './Login.scss'
import Section from './Section'


function Login() {

    function handleCallbackResponse(res: any) {
        console.log("Encoded JWT ID Token " + res.credential)
    }

    useEffect(() => {
        /*global google*/
        // @ts-ignore
        google.accounts.id.initialize({
            // client_id: '612460763976-4g28j4lkc0921pjb45ps20ju0fan4gaq.apps.googleusercontent.com',
            client_id: import.meta.env.VITE_REACT_APP_GSI_CLIENT_ID,
            callback: handleCallbackResponse
        });

        // @ts-ignore
        google.accounts.id.renderButton(
            document.getElementById("signInBtn"), { theme: "outline", size: "large" }
        );
    }, [])


    return (
        <Section height='100vh' display={undefined}>
            <div>
                <div id="signInBtn"></div>
            </div>
        </Section >
    )
};

export default Login;