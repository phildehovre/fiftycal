import React, { useContext } from 'react'
import CampaignVisualiser from '../components/CampaignVisualiser'
import CreateCampaign from '../components/CreateCampaign'
import { TemplateContext } from '../contexts/TemplateContext'
import { useTemplate, useTemplates } from '../util/db copy'

function CreateCampaignPage() {

    const { selectedTemplateId, setSelectedTemplateId } = useContext(TemplateContext)

    const { data: templatesData, isLoading: templatesIsLoading, error: templateError } = useTemplates()
    const { data: templateData, isLoading, error } = useTemplate(selectedTemplateId)


    return (
        <div>
            {
                templatesData && !templatesIsLoading &&
                <CreateCampaign
                    template={templateData?.data}
                    templates={templatesData?.data}
                />
            }
            {
                selectedTemplateId && !isLoading && templateData &&
                <CampaignVisualiser template={templateData.data} />
            }
        </div>
    )
}

export default CreateCampaignPage