import React, { useContext } from 'react'
import { Event } from '../contexts/TemplateContext'
import { TemplateContext } from '../contexts/TemplateContext'

function TemplateEvents() {

    // @ts-ignore
    const { template } = useContext(TemplateContext)

    const renderTemplateEvents = () => {
        return template.map((e: any, i: number) => {
            console.log(e)
            return (
                <div key={i}>
                    <h3>Phase {i}</h3>
                    <li>Name: {e.name}</li>
                    <li>Description: {e.description}</li>
                    <li>Start: {e.startDate.toISOString()}</li>
                    <li>End: {e.endDate.toISOString()}</li>
                </div>
            )
        })
    }

    return (
        <div>{renderTemplateEvents()}</div>
    )
}

export default TemplateEvents