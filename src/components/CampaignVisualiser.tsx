import React, { useState, useEffect } from 'react'
import { TemplateProps } from '../types/template'
import './Band.scss'
import Cell from './Cell'
import { supabase } from '../App'


function CampaignVisualiser(props: TemplateProps) {

    const [userIsCreatingEvent, setUserIsCreatingEvent] = useState<boolean>(false)
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

    const { duration, type } = props.template
    const durationNum = Number(duration.split(' ')[0])

    const band = [...Array(durationNum)]


    const renderBand = () => {
        return band.map((c, i) => {
            const dayMinus = i - durationNum + 1
            return (
                <Cell
                    key={i}
                    index={i}
                    dayMinus={dayMinus}
                    userIsCreatingEvent={userIsCreatingEvent}
                    setUserIsCreatingEvent={setUserIsCreatingEvent}
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