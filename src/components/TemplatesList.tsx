import React, { useContext, useEffect } from 'react'
import { TemplateContext } from '../contexts/TemplateContext';
import { useTemplates } from '../util/db';
import { useNavigate } from 'react-router-dom';
import './TemplateList.scss'

function TemplatesList() {

    const navigate = useNavigate()
    const { data: templates, error, isLoading } = useTemplates()
    const { selectedTemplateId, setSelectedTemplateId } = useContext(TemplateContext)

    // useEffect(() => {
    //     if (selectedTemplateId) {
    //         navigate(`/template/${selectedTemplateId}`)
    //     }
    // }, [selectedTemplateId])

    const renderTemplatesList = () => {
        if (!isLoading && templates) {
            return templates?.data?.map((t, i) => {
                return (
                    <div className='template_list-item' key={i} onClick={() => { setSelectedTemplateId(t.id) }}>{t.name}</div>
                )
            });
        };
    };

    return (
        <div className='template_list-ctn'>
            {renderTemplatesList()}
        </div>
    )
};

export default TemplatesList