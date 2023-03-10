import { DateTimePickerProps } from "react-datetime-picker"

export type TemplateType = {
    name: string,
    description: string,
    duration: number,
    unit: string,
    start: Date,
    end: Date
}

export type TemplateProps = {
    template: {
        name: string,
        duration: string,
        description: string,
        type: 'event' | 'template'
    },
}

export type CampaignProps = {
    campaignId: string | undefined,
    setCampaignId: (id: string) => void,
    events: Object | undefined,
    isEventsLoading: Boolean
}