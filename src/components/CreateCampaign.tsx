import React, { useContext, useEffect, useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { TemplateContext } from '../contexts/TemplateContext'
import { useTemplates } from '../util/db copy'
import './CreateCampaign.scss'
import 'react-calendar/dist/Calendar.css'

const schema = yup.object().shape({
    name: yup.string().required('A name for the event is required'),
    description: yup.string().required('A brief summary is required'),
    template: yup.string().required('Please Select a template'),
    endDate: yup.date().default(() => (new Date())).required('An end date is required'),
})

function CreateCampaign(props: {
    type: 'campaign' | 'template',
    template: object,
    templates: any
}) {

    const { template, templates } = props

    const [end, setEnd] = useState(new Date())
    const [duration, setDuration] = useState(1)
    const [unit, setUnit] = useState('days')

    const session = useSession()
    const { selectedTemplateId, setSelectedTemplateId } = useContext(TemplateContext)
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = (data: any) => {
        const { name, description, endDate } = data
        const template = {
            'name': name,
            'description': description,
            'end': {
                'dateTime': endDate.toISOString(),
                'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'duration': `${duration} ${unit}`,
            'user_id': session?.user.id,
            'template_id': selectedTemplateId
        }
    };

    const renderTemplateOptions = () => {
        return templates.map((t: object, i: number) => {
            const template = templates[i]
            return (
                <option
                    key={template.id}
                    value={template.id}
                >{template.name} - {template.duration}</option>
            )
        })
    };


    return (

        <div>
            <h3>Create : </h3>
            <select
                onChange={(e) => { setSelectedTemplateId(e.target.value) }}
            >
                {renderTemplateOptions()}
            </select>
            {selectedTemplateId &&
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', padding: '1em' }}>
                    <label>End date and time:</label>
                    <DateTimePicker
                        className='react-datetimepicker'
                        minDate={new Date()}
                        {...register('endDate')}
                        name='endDate'
                        value={end} onChange={setEnd}
                    />
                    <label>Name</label>
                    <input
                        {...register('name')}
                        name='name'
                        type='text'
                        placeholder={template?.name}
                        autoComplete='off'
                    ></input>
                    {errors.name && <label style={{ color: 'salmon' }}>{errors.name.message}</label>}
                    <label>Description</label>
                    <input
                        {...register('description')}
                        name='description'
                        type='text'
                        placeholder={template?.description}
                        autoComplete='off'
                    ></input>
                    {errors.description && <label style={{ color: 'salmon' }}>{errors.description.message}</label>}
                    <button
                        type='submit'
                    >Create </button>
                </form>
            }
        </div>
    )
}

export default CreateCampaign