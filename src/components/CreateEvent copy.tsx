import React, { useContext } from 'react'
import { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '../App'
import { TemplateContext } from '../contexts/TemplateContext'
import { useParams } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'

function CreateEvent(props: any) {

    const queryClient = useQueryClient()

    const { setShow, setUserIsCreatingEvent, setCellIndex, dayMinus } = props

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
            'date': dayMinus
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
            setShow(false)
            setUserIsCreatingEvent(false)
            setCellIndex(null)
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
            <div>
                <input type='number' min='1' placeholder='30' onChange={(e: any) => setDuration(e.target.value)}></input>
                <select onChange={(e: any) => { setUnit(e.target.value) }}>
                    <option value='days'>days</option>
                    <option value='weeks'>weeks</option>
                    <option value='months'>months</option>
                </select>
            </div>
            <label>Name</label>
            <input type='text' value={name} onChange={(e) => { setName(e.target.value) }}></input>
            <label>Description</label>
            <input type='text' value={description} onChange={(e) => { setDescription(e.target.value) }}></input>
            <button onClick={() => {
                createEvent()
                // mutateEvents.mutate(event)
            }}>{isLoading ? 'Loading...' : 'Create event'}</button>
        </div>
    )
}

export default CreateEvent