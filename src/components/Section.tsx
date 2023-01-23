import React from 'react'
import './Section.scss'

function Section(props: any) {

    // const { children, height, display } = props;

    const styles = {
        height, display
    }
    return (
        <div className='section' style={styles}>{children}</div>
    )
};

export default Section;