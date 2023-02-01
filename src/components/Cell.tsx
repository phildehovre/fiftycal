import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useContext } from 'react'
import { TemplateContext } from '../contexts/TemplateContext';
import { useEvents } from '../util/db';
import CreateEvent from './CreateEvent';
import Dropdown from './Dropdown';

function Cell(props: any) {

    const [show, setShow] = useState<boolean>(false)
    const [cellIndex, setCellIndex] = useState(null)
    const [hasEvent, setHasEvent] = useState<boolean>(false)
    const [displayEvent, setDisplayEvent] = useState<boolean>(false)
    const [showEventDetails, setShowEventDetails] = useState<boolean>(false)

    const { dayMinus, index, userIsCreatingEvent, setUserIsCreatingEvent } = props
    const { selectedTemplateId, events, isEventsLoading } = useContext(TemplateContext)

    // const { data: events, isLoading, error } = useEvents(selectedTemplateId)


    useEffect(() => {
        if (events) {
            //@ts-ignore
            const eventsArray = events.data.map((v: any) => {
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

    const renderEventDetails = () => {
        if (events !== undefined && !isEventsLoading) {
            // const { name, description } = events[dayMinus]
            return (
                <>
                    <button onClick={() => {
                        setUserIsCreatingEvent(false)
                        setShow(false)
                        setCellIndex(null)
                    }}>Delete event</button>
                    <button onClick={() => {
                        setUserIsCreatingEvent(false)
                        setShow(false)
                        setCellIndex(null)
                    }}>Cancel</button>
                </>
            )
        }
    }


    const handleCellDropdownDisplay = () => {
        if (userIsCreatingEvent) {
            return
        }
        setShow(true)
        setCellIndex(index)
    }

    const handleEventHover = () => {
        if (hasEvent) {
            setShowEventDetails(true)
        }
    };


    return (
        <>
            {
                isEventsLoading
                    ? <FontAwesomeIcon icon={faSpinner} />
                    : <div
                        className={`cell ${cellIndex === index ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
                        onClick={() => handleCellDropdownDisplay()}
                        onMouseEnter={() => { handleEventHover() }}
                        onMouseLeave={() => { setTimeout(() => setShowEventDetails(false), 1000) }}
                    >{dayMinus}

                        <Dropdown show={show}>
                            {renderEventCreation()}
                        </Dropdown>
                        <Dropdown show={showEventDetails}>
                            {renderEventDetails()}
                        </Dropdown>
                    </div>
            }
        </>
    )
}

export default Cell