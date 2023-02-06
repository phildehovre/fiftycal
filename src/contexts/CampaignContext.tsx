import React, { Children, useState } from 'react'
import { CampaignProps } from '../types/template';


export const CampaignContext = React.createContext({
    campaignId: '',
    setCampaignId: (id: string) => { }
});

function CampaignContextProvider(props: { children: any }) {

    const [campaignId, setCampaignId] = useState('ID')

    const values = {
        campaignId, setCampaignId
    }

    return (
        <CampaignContextProvider value={values}>
            {Children}
        </CampaignContextProvider>
    )
};

export default CampaignContextProvider