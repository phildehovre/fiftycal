import React, { useState } from 'react'
import { TemplateProps } from '../types/template'
import './Band.scss'
import Cell from './Cell'


function CampaignVisualiser(props: TemplateProps) {

    const [userIsCreatingEvent, setUserIsCreatingEvent] = useState<boolean>(false)

    const { duration } = props.template
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