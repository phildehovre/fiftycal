import React, { useEffect, useState } from 'react'

function PostEvents() {

    const [events, setEvents] = useState([1, 2, 3, 4, 5])


    useEffect(() => {
    }, [])

    return (
        <div>PostEvents</div>
    )
}

export default PostEvents