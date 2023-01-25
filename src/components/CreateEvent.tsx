import React from 'react'
import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

function CreateEvent() {
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const session = useSession()

    console.log(session)

    async function createEvent() {
        const event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': start.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        }
        try {
            await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                method: 'POST',
                headers: {
                    // @ts-ignore
                    'Authorization': 'Bearer ' + session.provider_token
                },
                body: JSON.stringify(event)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data)
            });
        } catch (error) {
            alert('Unable to create event at this time, see console for details')
            console.log(error)
        }
    }

    return (
        <div>
            <h3>Create event: </h3>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
                <DateTimePicker value={start} onChange={setStart} />
                <DateTimePicker value={end} onChange={setEnd} />
                <label>Name</label>
                <input type='text' value={eventName} onChange={(e) => { setEventName(e.target.value) }}></input>
                <label>Description</label>
                <input type='text' value={eventDescription} onChange={(e) => { setEventDescription(e.target.value) }}></input>
                <button onClick={() => { createEvent() }}>Create event</button>
            </div>
        </div>
    )
}

export default CreateEvent