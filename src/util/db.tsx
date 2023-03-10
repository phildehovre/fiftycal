import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '../App';
import { TemplateType } from '../types/template';



const fetchTemplate = async (id: string) => {
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

export function useTemplate(id: string) {
    return useQuery(
        ['template', { id }], () => fetchTemplate(id),
        {
            enabled: !!id
        }
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
        ['events'],
        () => fetchEvents(templateId),
        {
            enabled: !!templateId
        }
    )
};

async function createEvent(event: any) {
    const res = await supabase
        .from('events')
        .insert(event)
        .select()
    return res
}



async function fetchCampaigns() {
    let res = await supabase
        .from('campaigns')
        .select('*')
    return res
};

export function useCampaigns() {
    return useQuery(
        ['campaigns',],
        () => fetchCampaigns(),
    );
};
