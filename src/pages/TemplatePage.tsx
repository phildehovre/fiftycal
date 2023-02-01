import React, { useState, useContext, useEffect } from 'react'
import { TemplateContext } from '../contexts/TemplateContext'
import { supabase } from '../App';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTemplate } from '../util/db';
import Template from '../components/Template';
import CampaignVisualiser from '../components/CampaignVisualiser';
import TemplatesList from '../components/TemplatesList';

function TemplatePage() {

    const params = useParams()
    const { selectedTemplateId } = useContext(TemplateContext)

    const { data, isLoading, error } = useTemplate(selectedTemplateId || params.id)

    return (
        <>
            {isLoading && <h2>Loading...</h2>}

            {!isLoading && data &&
                <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <TemplatesList />
                    <CampaignVisualiser template={data.data} />
                    <Template template={data.data} />
                </div>
            }
        </>
    )
}

export default TemplatePage