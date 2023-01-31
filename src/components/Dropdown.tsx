import React from 'react'
import './Band.scss'

function Dropdown(props: { show: boolean, children: any }) {

    const { show, children } = props


    return (
        <>
            {show &&
                <div className='dropdown'>{children}</div>
            }
        </>
    )
}

export default Dropdown