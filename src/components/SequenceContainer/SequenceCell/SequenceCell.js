import React from "react";

import classes from "./SequenceCell.module.css";

const sequenceCell = (props) => {
  const cell = (
    <div
      type="number"
      className={classes.SequenceCell}
      value={props.value}
      index={props.index}
      onChange={(event) => props.changed(props.index, event.target.value)}
    >
      <span className={classes.Centerer}></span>
      <span className={classes.Centered}>{props.value}</span>
    </div>
  );
  return cell;
};

export default sequenceCell;
