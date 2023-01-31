import React, { useContext } from 'react'
import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../App'
import { TemplateContext } from '../contexts/TemplateContext'
import { useParams } from 'react-router-dom'

function CreateEvent() {
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [duration, setDuration] = useState(1)
    const [unit, setUnit] = useState('days')

    const session = useSession()
    const { selectedTemplateId } = useContext(TemplateContext)
    const params = useParams()


    async function createEvent() {
        const event = {
            'template_id': selectedTemplateId || params.id,
            'name': name,
            'description': description,
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
            const { data, error } = await supabase
                .from('events')
                .insert(event)
                .select()
            setIsLoading(true)
            console.log(error)
            return data
        }

        catch (error) {
            console.log(error)
        }

        finally {
            setIsLoading(false)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
            <DateTimePicker value={start} onChange={setStart} />
            <DateTimePicker value={end} onChange={setEnd} />
            <label>Name</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            <label>Description</label>
            <input type='text' value={description} onChange={(e) => { setDescription(e.target.value) }}></input>
            <button onClick={() => { createEvent() }}>{isLoading ? 'Loading...' : 'Save template'}</button>
        </div>
    )
}

export default CreateEvent