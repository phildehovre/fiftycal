import React, { useState, useEffect, useContext } from 'react'
import { TemplateContext } from '../contexts/TemplateContext';
import { useEvents } from '../util/db';
import CreateEvent from './CreateEvent';
import Dropdown from './Dropdown';

function Cell(props: any) {

    const [show, setShow] = useState<boolean>(false)
    const [cellIndex, setCellIndex] = useState(null)
    const [hasEvent, setHasEvent] = useState<boolean>(false)

    const { dayMinus, index, userIsCreatingEvent, setUserIsCreatingEvent } = props
    const { selectedTemplateId } = useContext(TemplateContext)

    const { data: events, isLoading, error } = useEvents(selectedTemplateId)


    useEffect(() => {
        if (events) {
            const eventsArray = events.data.map(v => {
                return v.date
            });
            // console.log(eventsArray)
            if (eventsArray.includes(dayMinus)) {
                setHasEvent(true)
            }
        };
    });



    const renderEventCreation = () => {
        if (userIsCreatingEvent) {
            return (<>
                <CreateEvent
                    setShow={setShow}
                    setUserIsCreatingEvent={setUserIsCreatingEvent}
                    setCellIndex={setCellIndex}
                    dayMinus={dayMinus}
                />
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
                className={`cell ${cellIndex === index ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
                onClick={() => handleCellDropdownDisplay()}>{dayMinus}
                <Dropdown show={show}>
                    {renderEventCreation()}
                </Dropdown>
            </div>
        </>
    )
}

export default Cell