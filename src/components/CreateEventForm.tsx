import React from 'react'
import { useState, useContext } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { TemplateContext } from '../contexts/TemplateContext'



const schema = yup.object().shape({
    name: yup.string().required('Your first name is required'),
    description: yup.string().required('Your last name is required'),
    startDate: yup.date().default(() => (new Date())).required('A start date is required'),
    endDate: yup.date().default(() => (new Date())).required('A start date is required'),
})

function CreateEventForm() {
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


    const session = useSession()
    // @ts-ignore
    const { addEventToTemplate, createTemplate } = useContext(TemplateContext)
    const onSubmit = (event: any) => {
        console.log(event)
        addEventToTemplate(event)
    }

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
        addEventToTemplate(event)
        // try {
        //     await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        //         method: 'POST',
        //         headers: {
        //             // @ts-ignore
        //             'Authorization': 'Bearer ' + session.provider_token
        //         },
        //         body: JSON.stringify(event)
        //     }).then((data) => {
        //         return data.json();
        //     }).then((data) => {
        //         console.log(data)
        //     });
        // } catch (error) {
        //     alert('Unable to create event at this time: ' + error)
        // }
    }

    return (
        <div>
            <h3>Create event: </h3>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
                {/* <label className='form-error'>{errors.firstName?.message}</label> */}
                <label>Start date and time:</label>
                <DateTimePicker
                    {...register('startDate')}
                    value={start}
                    onChange={setStart}
                    name='startDate'
                />
                <label>End date and time:</label>
                <DateTimePicker
                    {...register('endDate')}
                    {...register('endDate')}
                    name='endDate'
                    value={end} onChange={setEnd} />
                <label>Name</label>
                <input
                    {...register('name')}
                    name='name'
                    type='text' value={eventName} onChange={(e) => { setEventName(e.target.value) }}></input>
                <label>Description</label>
                <input
                    {...register('description')}
                    name='description'
                    type='text' value={eventDescription} onChange={(e) => { setEventDescription(e.target.value) }}></input>
                <button
                    type='submit'
                // onClick={() => { createEvent() }}
                // onClick={() => handleSubmit(onSubmit)}
                >Create event</button>
            </form>
            <button onClick={() => createTemplate()}>Create template</button>
        </div>
    )
}

export default CreateEventForm