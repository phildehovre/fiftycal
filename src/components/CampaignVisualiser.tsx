import React, { useState, useEffect, useContext } from 'react'
import { TemplateProps } from '../types/template'
import './Band.scss'
import Cell from './Cell'
import { supabase } from '../App'
import { TemplateContext } from '../contexts/TemplateContext'


function CampaignVisualiser(props: TemplateProps) {

    const [userIsCreatingEvent, setUserIsCreatingEvent] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)


    const { duration, type } = props.template
    const durationNum = Number(duration.split(' ')[0])

    const band = [...Array(durationNum)]
    const { selectedTemplateId, isEventsLoading, events } = useContext(TemplateContext)



    const renderBand = () => {
        let dayMinus: number
        return band.map((c, i) => {
            dayMinus = i - durationNum + 1
            let event = events?.data.find((v: any) => {
                return v.date === dayMinus
            });
            const eventObj = event
            return (
                <Cell
                    key={i}
                    index={i}
                    hasEvent={event ? true : false}
                    event={eventObj}
                    dayMinus={dayMinus}
                    userIsCreatingEvent={userIsCreatingEvent}
                    setUserIsCreatingEvent={setUserIsCreatingEvent}
                    isEventsLoading={isEventsLoading}
                />
            )
        });
    };

    return (
        <div className='band'>
            {renderBand()}
        </div>
    )
}

export default CampaignVisualiser