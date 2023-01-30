import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../App';
import { TemplateType } from '../types/template';

const fetchTemplate = async (id: any) => {
    try {
        const res = await supabase
            .from('templates')
            .select()
            .eq('id', id)
            .single()
        return res
    }

    catch (error) {
        console.log(error)
    }

    finally {
    }
};

export function useTemplate(id: string | undefined) {
    return useQuery(
        ['template', { id }], () => fetchTemplate(id)
    )
};

const createTemplate = async (templateObj: TemplateType) => {
    const { name, description, start, end, duration, unit } = templateObj
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
        return res
    }

    catch (error) {
        console.log(error)
    };
};

export function useCreateTemplate(template: TemplateType) {
    const { name } = template
    return useQuery(
        ['template', { name }], () => createTemplate(template),
        {
            enabled: !!template
        }
    )
};