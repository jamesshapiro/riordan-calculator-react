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
                value={props.value}
                // defaultValue={props.value}
                onChange={props.changed}
                onClick={props.clicked}
                onBlur={props.unclicked}
                disabled={props.disableControls}
                placeholder={"Click Twice"}
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