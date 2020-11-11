import React from 'react'

import classes from './SequenceSelector.module.css'

const sequenceSelector = (props) => {
    const selector = (
        <select
            className={classes.SequenceSelector}
            label={props.label}
            value={props.selectedSequence}
            onChange={props.changed} >
            {props.elementConfig.options.map(option => (
                // <option key={option.value} value={option.value} selected={props.selectedSequence === option.value ? true : false}>
                <option key={option.value} value={option.value}>
                    {option.displayValue}
                </option>
            ))}
        </select>
    );


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {selector}
        </div>
    )
}

export default sequenceSelector;