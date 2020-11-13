import React from "react";

import classes from "./ModeSelector.module.css";

const modeSelector = (props) => {
  const selector = (
    <select name="mode" id="mode" onChange={props.changed}>
      <option value="Normal">Normal</option>
      <option value="Bell Subgroup">Bell Subgroup</option>
    </select>
  );

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>Mode: </label>
      {selector}
    </div>
  );
};

export default modeSelector;
