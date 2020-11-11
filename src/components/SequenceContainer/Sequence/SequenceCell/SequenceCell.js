import React from 'react'

import classes from './SequenceCell.module.css'

const sequenceCell = (props) => {
    const cell = <input 
        type="number" 
        className={classes.SequenceCell}
        value={props.value}
        index={props.index}
        onChange={(event) => props.changed(props.index, event.target.value)}></input>

    return cell;
};

export default sequenceCell;