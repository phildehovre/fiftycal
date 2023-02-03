import React, { useContext, useEffect } from 'react'
import { TemplateContext } from '../contexts/TemplateContext';
import { useTemplates } from '../util/db';
import { Link, useNavigate } from 'react-router-dom';
import './TemplateList.scss'
import CreateTemplate from './CreateTemplate';

function TemplatesList() {

    const navigate = useNavigate()
    const { data: templates, error, isLoading } = useTemplates()
    const { selectedTemplateId, setSelectedTemplateId } = useContext(TemplateContext)

    const renderTemplatesList = () => {
        if (!isLoading && templates) {
            return templates?.data?.map((t, i) => {
                return (
                    <div className='list-item' key={i} onClick={() => { setSelectedTemplateId(t.id) }}>{t.name}</div>
                )
            });
        };
    };

    return (
        <div className='template_list-ctn'>
            <h2>Templates</h2>
            <Link to='/new-template'>New template</Link>
            {renderTemplatesList()}
        </div>
    )
};

export default TemplatesList