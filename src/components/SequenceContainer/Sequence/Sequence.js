import React from 'react'

import classes from './Sequence.module.css'

const sequence = (props) => {
    const button = (
        <button
            className={classes.SequenceButton}
            onClick={props.clicked}
        >
        {props.content}
        </button>
    );

    return button;
};

export default sequence;