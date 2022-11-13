import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "../Matrix/MatrixTable/MatrixTable.module.css";

class Vector extends Component {
  render() {
    const sequenceSelector = this.props.sequenceSelector;
    let sequenceData = null;
    switch (sequenceSelector) {
      case "A-sequence":
        sequenceData = this.props.aSequence;
        break;
      case "B-sequence":
        sequenceData = this.props.bSequence;
        break;
      case "Z-sequence":
        sequenceData = this.props.zSequence;
        break;
      case "Tweedle Left A-sequence":
        sequenceData = this.props.tweedleLeftASequence;
        break;
      case "Tweedle Left B-sequence":
        sequenceData = this.props.tweedleLeftBSequence;
        break;
      case "Tweedle Left Z-sequence":
        sequenceData = this.props.tweedleLeftZSequence;
        break;
      case "Tweedle Right A-sequence":
        sequenceData = this.props.tweedleRightASequence;
        break;
      case "Tweedle Right B-sequence":
        sequenceData = this.props.tweedleRightBSequence;
        break;
      case "Tweedle Right Z-sequence":
        sequenceData = this.props.tweedleRightZSequence;
        break;
      default:
        break;
    }
    let sequence = null;

    if (sequenceData) {
      sequence = (
        <div style={{ margin: "10px" }}>
          <h1 style={{ display: "inline" }}>
            {this.props.sequenceSelector + ": "}
          </h1>
          <table
            style={{ display: "inline-block" }}
            className={classes.MatrixTable}
          >
            <tbody>
              <tr key={"only-row"}>
                {sequenceData.map((item, index) => {
                  return (
                    <td key={index} className={classes.MatrixCell}>
                      {sequenceData[index]}
                    </td>
                  );
                })}
                <td key="oeis" className={classes.MatrixCell}>
                  <a
                    href={
                      "http://oeis.org/search?q=" +
                      sequenceData.join("%2C") +
                      "&language=english&go=Search"
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button id="oeisButton">OEIS</button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          {/* <MatrixTable matrixData={sequenceData} /> */}
        </div>
      );
    }
    return <div>{sequence}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    aSequence: state.calc.a_sequence,
    bSequence: state.calc.b_sequence,
    zSequence: state.calc.z_sequence,
    tweedleLeftASequence: state.calc.tweedle_left_a_sequence,
    tweedleLeftBSequence: state.calc.tweedle_left_b_sequence,
    tweedleLeftZSequence: state.calc.tweedle_left_z_sequence,
    tweedleRightASequence: state.calc.tweedle_right_a_sequence,
    tweedleRightBSequence: state.calc.tweedle_right_b_sequence,
    tweedleRightZSequence: state.calc.tweedle_right_z_sequence,
    loadingMatrix: state.calc.loadingMatrix,
  };
};

export default connect(mapStateToProps)(Vector);
