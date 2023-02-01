import React, { useContext } from 'react'
import CampaignVisualiser from '../components/CampaignVisualiser'
import Template from '../components/Template'
import TemplatesList from '../components/TemplatesList'
import './Dashboard.scss'
import { useParams } from 'react-router-dom'
import { TemplateContext } from '../contexts/TemplateContext'
import { useTemplate } from '../util/db'

function DashboardPage() {
    const params = useParams()
    const { selectedTemplateId } = useContext(TemplateContext)

    const { data, isLoading, error } = useTemplate(selectedTemplateId || params.id)

    return (
        <div className='dashboard-ctn'>
            <TemplatesList />
            {!isLoading && data && selectedTemplateId &&
                <div className='template' >
                    <CampaignVisualiser template={data.data} />
                    <Template template={data.data} />
                </div>
            }
        </div>
    )
}


export default DashboardPage