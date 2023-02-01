import React, { useContext } from 'react'
import { TemplateProps } from '../types/template'
import { TemplateContext } from '../contexts/TemplateContext'

function Template(props: TemplateProps) {

    const { template } = props
    const { selectedTemplateId } = useContext(TemplateContext)

    // console.log(selectedTemplateId)
    return (
        <div>                    <h1>
            {template?.name}
        </h1>
            <p>{template?.duration}</p>
            <p>{template?.description}</p></div>
    )
}

export default Template