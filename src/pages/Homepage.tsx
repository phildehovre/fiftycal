import React, { useEffect, useState } from 'react'
import { useSession, useSessionContext } from '@supabase/auth-helpers-react'
import CreateEvent from '../components/CreateEvent';
import Hero from '../components/Hero';
import TemplatesList from '../components/TemplatesList';
import DateTimePicker from 'react-datetime-picker';



function Homepage() {

    const session = useSession(); //tokens, when session exists, we have a user

    const { isLoading } = useSessionContext()

    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [nextEvent, setNextEvent] = useState([])
    // console.log(start, end)

    const start1 = new Date('Mon Feb 06 2023 16:48:00 GMT+0000 (Greenwich Mean Time)')
    const end1 = new Date('Mon Feb 06 2023 17:48:00 GMT+0000 (Greenwich Mean Time)')

    const start2 = new Date('Sat Feb 04 2023 16:48:00 GMT+0000 (Greenwich Mean Time)')
    const end2 = new Date('Sat Feb 04 2023 17:48:00 GMT+0000 (Greenwich Mean Time)')

    const start3 = new Date('Sun Feb 05 2023 16:48:00 GMT+0000 (Greenwich Mean Time)')
    const end3 = new Date('Sun Feb 05 2023 17:48:00 GMT+0000 (Greenwich Mean Time)')

    let events = [
        {
            'summary': eventName + '1',
            'description': eventDescription,
            'start': {
                'dateTime': start1.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end1.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        },
        {
            'summary': eventName + '2',
            'description': eventDescription,
            'start': {
                'dateTime': start2.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end2.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        },
        {
            'summary': eventName + '3',
            'description': eventDescription,
            'start': {
                'dateTime': start3.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end3.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
        },
    ]


    async function postEvents() {
        for (let i = 0; i < events.length; i++) {
            createEvent(events[i]).then(() => {
                events = events.slice(i + 1, events.length - 1)
                console.log(events)
            }).catch(err => alert(err));
        }
    }




    async function createEvent(event: object) {
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
            console.log(error)
            alert('Unable to create event at this time: ' + error)
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
                <button onClick={() => { postEvents() }}>Create event</button>
            </div>
            <div>
                <div>Hello</div>
                {
                    session
                        ? <TemplatesList />
                        : <Hero />
                }
            </div>
        </div>
    )

}

export default Homepage