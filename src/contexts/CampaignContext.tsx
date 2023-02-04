import React, { Children, useState } from 'react'

const CampaignContext = React.createContext({
})

function CampaignContextProvider(props: { children: any }) {

    const [campaignId, setCampaignId] = useState('')

    const values = {
        campaignId, setCampaignId
    }

    return (
        <CampaignContextProvider value={values}>
            {Children}
        </CampaignContextProvider>
    )
}

export default CampaignContextProvider