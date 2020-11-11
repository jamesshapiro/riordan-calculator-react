import React from 'react'

import classes from './Sequence.module.css'

const sequence = (props) => {
    const sequence = props.sequence.join(', ')

    return (
        <div className={classes.Sequence}>
            {sequence}
        </div>
        
    )
};

export default sequence;