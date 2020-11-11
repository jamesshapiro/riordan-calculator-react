import React from 'react'

import classes from './SequenceButton.module.css'

const sequenceButton = (props) => {
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

export default sequenceButton;