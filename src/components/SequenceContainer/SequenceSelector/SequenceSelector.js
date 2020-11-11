import React from 'react'

import classes from './SequenceSelector.module.css'

const input = (props) => {
    const selector = (
        <select
            className={classes.SequenceSelector}
            label={props.label}
            onChange={props.changed} >
            {props.elementConfig.options.map(option => (
                <option key={option.value} value={option.value} selected={option.selected}>
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

export default input