import React, { Children, useState } from 'react'
import { CampaignProps } from '../types/template';


export const CampaignContext = React.createContext({
    campaignId: '',
    setCampaignId: (id: string) => { }
});

function CampaignContextProvider(props: any) {

    const [campaignId, setCampaignId] = useState('ID')

    const values = {
        campaignId, setCampaignId
    }

    return (
        <CampaignContext.Provider value={values}>
            {props.children}
        </CampaignContext.Provider>
    )
};

export default CampaignContextProvider