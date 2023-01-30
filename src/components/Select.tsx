import React, { useState } from 'react'
import { String } from './CreateTemplate'

function Select({ unit }: String) {

    const [open, setOpen] = useState<Boolean>()

    return (
        <><div className='select-ctn' onClick={() => { setOpen(!open) }}></div>
            {open &&
                <div></div>
            }
            <div>{unit !== 'number' ? unit : null}</div>
        </>
    )
}

export default Select