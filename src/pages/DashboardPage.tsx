import React, { useContext } from 'react'
import CampaignVisualiser from '../components/CampaignVisualiser'
import Template from '../components/Template'
import TemplatesList from '../components/TemplatesList'
import './Dashboard.scss'
import { useParams } from 'react-router-dom'
import { TemplateContext } from '../contexts/TemplateContext'
import { useTemplate } from '../util/db'
import CampaignsList from '../components/CampaignsList'
import SideNav from '../components/SideNav'
import { useSession } from '@supabase/auth-helpers-react'

function DashboardPage() {
    const params = useParams()
    const { selectedTemplateId } = useContext(TemplateContext)
    const session = useSession()

    const { data, isLoading, error } = useTemplate(selectedTemplateId || params.id)

    return (
        <div className='dashboard-ctn'>
            <SideNav>
                {session && <>
                    <TemplatesList />
                    <CampaignsList />
                </>
                }
            </SideNav>
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