import React from "react";

import classes from "./ModeSelector.module.css";

const modeSelector = (props) => {
  const selector = (
    <select name="mode" id="mode" onChange={props.changed}>
      <option value="Normal">Normal</option>
      <option value="Bell Subgroup">Bell Subgroup</option>
      <option value="Derivative Subgroup">Derivative Subgroup</option>
      <option value="Appell Subgroup">Appell Subgroup</option>
      <option value="Associated (Lagrange) Subgroup">
        Associated (Lagrange) Subgroup
      </option>
      <option value="2-Bell Subgroup">2-Bell Subgroup</option>
      {/* <option value="2-Bell Subgroup">2-Bell Subgroup</option> */}
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
