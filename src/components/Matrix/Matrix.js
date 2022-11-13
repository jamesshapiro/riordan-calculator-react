import React, { Component } from "react";
import { connect } from "react-redux";

//import * as actions from '../../store/actions/calcIndex';
import Spinner from "../UI/Spinner/Spinner";
import MatrixTable from "./MatrixTable/MatrixTable";

class Matrix extends Component {
  state = {};

  render() {
    const matrixSelector = this.props.matrixSelector;
    let matrixData = null;
    switch (matrixSelector) {
      case "riordan":
        matrixData = this.props.riordanGroupElem;
        break;
      case "stieltjes":
        matrixData = this.props.stieltjes;
        break;
      case "exponential":
        matrixData = this.props.exponential;
        break;
      case "exponentialstieltjes":
        matrixData = this.props.exponentialstieltjes;
        break;
      case "tweedle_left":
        matrixData = this.props.tweedle_left;
        break;
      case "tweedle_right":
        matrixData = this.props.tweedle_right;
        break;
      default:
        break;
    }
    let matrix = null;
    if (this.props.loadingMatrix) {
      matrix = <Spinner />;
    }
    if (!this.props.loadingMatrix) {
    }
    if (matrixData) {
      matrix = (
        <div>
          <h1>{this.props.matrixName}</h1>
          <MatrixTable matrixData={matrixData} />
        </div>
      );
    }
    return <div>{matrix}</div>;
  }
}

const mapStateToProps = (state) => {
  // console.log('==============================')
  // console.log(state.calc.exponential)
  // console.log('==============================')
  return {
    numCellsToDisplay: state.calc.numCellsToDisplay,
    loadingMatrix: state.calc.loadingMatrix,
    riordanGroupElem: state.calc.riordan_group_elem,
    stieltjes: state.calc.stieltjes,
    exponential: state.calc.exponential,
    exponentialstieltjes: state.calc.exponentialstieltjes,
    tweedle_left: state.calc.tweedle_left,
    tweedle_right: state.calc.tweedle_right
  };
};

export default connect(mapStateToProps)(Matrix);
