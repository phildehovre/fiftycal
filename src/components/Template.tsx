import React from 'react'
import { TemplateProps } from '../types/template'

function Template(props: TemplateProps) {

    const { template } = props

    return (
        <div>                    <h1>
            {template?.name}
        </h1>
            <p>{template?.duration}</p>
            <p>{template?.description}</p></div>
    )
}

export default Template