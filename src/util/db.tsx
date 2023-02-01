import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
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



async function fetchTemplates() {
    let res = await supabase
        .from('templates')
        .select('*')
    return res
};

export function useTemplates() {
    return useQuery(
        ['templates'],
        () => fetchTemplates()
    )
};

async function fetchEvents(id: any) {
    let res = await supabase
        .from('events')
        .select('*')
        .eq('template_id', id)
    return res
};

export function useEvents(templateId: any) {
    return useQuery(
        ['events', templateId],
        () => fetchEvents(templateId),
        {
            enabled: !!templateId,
            // refetchOnMount: true

        }
    );
};

export async function createEvent(event: any) {
    const res = await supabase
        .from('events')
        .insert(event)
        .select()
    return res
}

