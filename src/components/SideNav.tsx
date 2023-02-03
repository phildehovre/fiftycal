import React from 'react'
import './SideNav.scss'

function SideNav(props: any) {
    const { children } = props
    return (
        <div className='sidenav-ctn'>{children}</div>
    )
}

export default SideNav