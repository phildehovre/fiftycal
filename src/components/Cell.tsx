import React, { useState, useEffect } from 'react'
import CreateEvent from './CreateEvent';
import Dropdown from './Dropdown';

function Cell(props: any) {

    const [show, setShow] = useState<boolean>(false)
    const [cellIndex, setCellIndex] = useState(null)



    const { dayMinus, index, userIsCreatingEvent, setUserIsCreatingEvent } = props

    const renderEventCreation = () => {
        if (userIsCreatingEvent) {
            return (<>
                <CreateEvent />
                <button onClick={() => {
                    setUserIsCreatingEvent(false)
                    setShow(false)
                    setCellIndex(null)
                }}>Cancel</button>
            </>
            )
        }
        return (
            <div className='menu' onClick={() => setUserIsCreatingEvent(true)}>Create event</div>
        )
    }

    const handleCellDropdownDisplay = () => {
        if (userIsCreatingEvent) {
            return
        }
        setShow(true)
        setCellIndex(index)
    }

    return (
        <>
            <div
                className={`cell ${cellIndex === index ? 'selected' : ''}`}
                onClick={() => handleCellDropdownDisplay()}>{dayMinus}
                <Dropdown show={show}>
                    {renderEventCreation()}
                </Dropdown>
            </div>
        </>
    )
}

export default Cell