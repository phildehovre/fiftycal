import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { TemplateContext } from '../contexts/TemplateContext';
import { useCampaigns } from '../util/db';
import { useNavigate } from 'react-router-dom';
import './TemplateList.scss'

function CampaingsList() {

    const navigate = useNavigate()
    const { data, error, isLoading } = useCampaigns()
    const { selectedTemplateId, setSelectedTemplateId } = useContext(TemplateContext)


    const renderCampaignsList = () => {
        if (!isLoading && data) {
            return data?.data?.map((t: any, i: number) => {
                return (
                    <div className='list-item' key={i} onClick={() => { setSelectedTemplateId(t.id) }}>{t.name}</div>
                )
            });
        };
    };

    return (
        <div className='campaings_list-ctn'>
            <h2>Campaigns</h2>
            <Link to='/new-campaign'>New campaign</Link>
            {renderCampaignsList()}
        </div>
    )
};

export default CampaingsList