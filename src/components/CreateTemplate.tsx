import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../App';
import DateTimePicker from 'react-datetime-picker';
import { uuidv4 } from '@firebase/util';
import { TemplateContext } from '../contexts/TemplateContext';
// import Select from './Select';
import './CreateTemplate.scss'
import { useSession } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom';
import { TemplateType } from '../types/template';


export interface String {
    unit: string
}

function CreateTemplate() {


    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [duration, setDuration] = useState(1)
    const [unit, setUnit] = useState('days')
    const [userIsCreating, setUserIsCreating] = useState<Boolean>(false)

    const context = useContext(TemplateContext)
    const session = useSession(); //tokens, when session exists, we have a user
    const navigate = useNavigate()

    const createTemplate = async () => {
        const template = {
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
            'duration': `${duration} ${unit}`
        }

        try {
            const res = await supabase
                .from('templates')
                .insert(template)
                .select()
            setIsLoading(true)
            if (res.data !== null) {
                context.setSelectedTemplateId(res.data[0].id)
            }
            return res

        }

        catch (error) {
            console.log(error)
        }

        finally {
            setIsLoading(false)
            navigate(`/template/${context.selectedTemplateId}`)
        }
    }




    return (
        <>
            {!userIsCreating && <button onClick={() => setUserIsCreating(true)}>Create Template</button>}
            {
                userIsCreating &&
                <div style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
                    <DateTimePicker value={start} onChange={setStart} />
                    <DateTimePicker value={end} onChange={setEnd} />
                    <label>Name</label>
                    <input type='text' value={name} onChange={(e) => { setName(e.target.value) }}></input>
                    <label>Description</label>
                    <input type='text' value={description} onChange={(e) => { setDescription(e.target.value) }}></input>
                    {/* IMPLEMENT CUSTOM SELECTS LATER */}

                    {/* <Select unit={'number'} /> */}
                    {/* <Select unit={'days'} /> */}
                    <div>
                        <input type='number' min='1' placeholder='30' onChange={(e: any) => setDuration(e.target.value)}></input>
                        <select onChange={(e: any) => { setUnit(e.target.value) }}>
                            <option value='days'>days</option>
                            <option value='weeks'>weeks</option>
                            <option value='months'>months</option>
                        </select>
                    </div>
                    <button onClick={() => { createTemplate() }}>{isLoading ? 'Loading...' : 'Save template'}</button>
                    <button onClick={() => setUserIsCreating(false)}>Cancel</button>
                </div>
            }
        </>

    )
}

export default CreateTemplate