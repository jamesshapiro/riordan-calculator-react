import React from 'react'

import classes from './SequenceSelector.module.css'

const sequenceSelector = (props) => {
    const selector = (
        <span>
            <input 
                className={classes.SequenceSelector}
                type="text" 
                list="sequences"
                label={props.label}
                value={props.selectedSequence}
                onChange={props.changed}
            />
            <datalist id="sequences">
                {props.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </datalist>
        </span>
    );


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {selector}
        </div>
    )
}

export default sequenceSelector;