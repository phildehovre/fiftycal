import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useContext, useRef } from 'react'
import { TemplateContext } from '../contexts/TemplateContext';
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { supabase } from '../App';
import CreateEvent from './CreateEvent';
import Dropdown from './Dropdown';
import { useEvents } from '../util/db';
import { faGalacticSenate } from '@fortawesome/free-brands-svg-icons';

function Cell(props: any) {

    const [show, setShow] = useState<boolean>(false)
    const [cellIndex, setCellIndex] = useState(null)
    const [showEventDetails, setShowEventDetails] = useState<boolean>(false)

    const {
        dayMinus,
        index,
        userIsCreatingEvent,
        setUserIsCreatingEvent,
        hasEvent, event,
        isEventsLoading
    } = props

    // const { data: events, isLoading, error } = useEvents(selectedTemplateId)

    const queryClient = useQueryClient()
    const dropdownRef = useRef()


    const deleteEventMutation = useMutation({
        mutationFn: async (id: string) => await supabase
            .from('events')
            .delete()
            .eq('id', id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] }),
                setShowEventDetails(false)
        }
    });

    const renderEventCreation = () => {

        if (userIsCreatingEvent && !hasEvent) {
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
        if (!hasEvent) {
            return (
                <div className='menu' onClick={() => {
                    setUserIsCreatingEvent(true)
                }}
                >Create event
                </div>
            )
        }

    };


    const renderEventDetails = () => {
        if (event !== undefined && !isEventsLoading) {
            return (
                <><div>{event?.name}</div>
                    <p>{event?.description}</p>
                    <CreateEvent />
                    <button onClick={() => {
                        setUserIsCreatingEvent(false)
                        setCellIndex(null)
                        //@ts-ignore
                        deleteEventMutation.mutate(event?.id)
                    }}>{deleteEventMutation.isLoading ? 'Loading' : 'Delete event'}</button>
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
        if (userIsCreatingEvent || hasEvent) {
            return
        }
        setShow(true)
        setCellIndex(index)
    }

    const handleMouseHover = (val: string) => {
        if (val === 'out') {
            // var timer = setTimeout(() => 
            setShowEventDetails(false)
            // , 1000)
        }
        if (hasEvent && val === 'in') {
            setShowEventDetails(true)
            // return () => clearTimeout(timer)
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
                        onMouseEnter={() => { handleMouseHover('in') }}
                        onMouseLeave={() => { handleMouseHover('out') }}
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