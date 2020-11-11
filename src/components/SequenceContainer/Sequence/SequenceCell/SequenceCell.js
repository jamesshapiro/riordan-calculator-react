import React from 'react'

import classes from './SequenceCell.module.css'

const sequenceCell = (props) => {
    const cell = <input 
        type="number" 
        className={classes.SequenceCell}
        value={props.value}
        onChange={props.changed}></input>

    return cell;
};

export default sequenceCell;