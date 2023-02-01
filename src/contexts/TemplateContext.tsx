import React from 'react'
import { useState } from 'react'
import { useEvents } from '../util/db';

type TemplateProps = {
    selectedTemplateId: string | undefined,
    setSelectedTemplateId: (id: string) => void,
    events: Object | undefined,
    isEventsLoading: Boolean
}
export const TemplateContext = React.createContext<TemplateProps>({
    selectedTemplateId: '',
    setSelectedTemplateId: () => { },
    events: Object,
    isEventsLoading: false
});

export interface Event {
    name: string,
    description: string,
    endDate: Date,
    startDate: Date
};

function TemplateContextProvider(props: any) {

    const [selectedTemplateId, setSelectedTemplateId] = useState<string>()

    const {
        data: events,
        isLoading: isEventsLoading,
        error: eventsError
    } = useEvents(selectedTemplateId)

    const values = {
        selectedTemplateId,
        setSelectedTemplateId,
        events,
        isEventsLoading,
        eventsError
    };

    return (

        <TemplateContext.Provider value={values}>
            {props.children}
        </TemplateContext.Provider >

    )
}

export default TemplateContextProvider