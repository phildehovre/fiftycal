import React, { useState, useEffect } from 'react'

function Cell(props: any) {

    const [show, setShow] = useState<boolean>(false)

    const { dayMinus, index } = props

    useEffect(() => {
        const event = window.addEventListener('click', (e) => {
            if (e.target?.className !== 'cell') {
                setShow(false)
            }
        });
    }, [])


    return (
        <>
            <div className='cell' onClick={() => setShow(!show)}>{dayMinus}
                {show &&
                    <div className='dropdown'>New event</div>
                }
            </div>
        </>
    )
}

export default Cell