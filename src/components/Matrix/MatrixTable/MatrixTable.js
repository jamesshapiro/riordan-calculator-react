import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/calcIndex";
import classes from "./MatrixTable.module.css";

class MatrixTable extends Component {
  state = {
    renderRowSums: true,
  };

  toggleRowSums = (event) => {
    this.setState({ renderRowSums: !this.state.renderRowSums });
  };

  render() {
    const showRowSumsCheckbox = (
      <div>
        <input
          type="checkbox"
          id="showRowSums"
          name="showRowSums"
          value="showRowSums"
          defaultChecked={this.state.renderRowSums}
          onClick={this.toggleRowSums}
        ></input>
        <label htmlFor="showRowSums"> Show Row Sums</label>
      </div>
    );

    const matrixData = this.props.matrixData;
    const rowSums = matrixData.map((row) => {
      return row.reduce(function (a, b) {
        return a + b;
      }, 0);
    });

    const alternatingRowSums = matrixData.map((row) => {
      const newVector = new Array(row.length).fill(1);
      for (let idx in newVector) {
        if (idx % 2 == 1) {
          newVector[idx] = -1;
        }
      }
      const unreducedProduct = row.map((elem, idx) => {
        return elem * newVector[idx];
      });
      return unreducedProduct.reduce(function (a, b) {
        return a + b;
      }, 0);
    });

    const oeisRow = matrixData[0].map((elem, index) => {
      const subsequence = matrixData.slice(index).map((row) => row[index]);
      return (
        <td key={"oeis-" + index} className={classes.MatrixCell}>
          <a
            target="_blank"
            href={
              "http://oeis.org/search?q=" +
              subsequence.join("%2C") +
              "&language=english&go=Search"
            }
          >
            <button> OEIS </button>
          </a>
        </td>
      );
    });
    const rowSumsOEISButton = (
      <td key={"oeis-row-sums"} className={classes.MatrixCell}>
        <a
          target="_blank"
          href={
            "http://oeis.org/search?q=" +
            rowSums.slice(0, -1).join("%2C") +
            "&language=english&go=Search"
          }
        >
          <button> OEIS </button>
        </a>
      </td>
    );

    const alternatingRowSumsOEISButton = (
      <td key={"oeis-alternating-row-sums"} className={classes.MatrixCell}>
        <a
          target="_blank"
          href={
            "http://oeis.org/search?q=" +
            alternatingRowSums.slice(0, -1).join("%2C") +
            "&language=english&go=Search"
          }
        >
          <button> OEIS </button>
        </a>
      </td>
    );

    if (this.state.renderRowSums) {
      oeisRow.push(rowSumsOEISButton);
      oeisRow.push(alternatingRowSumsOEISButton);
    }
    const tableRows = matrixData.map((row, rowIdx) => {
      const subsequence = matrixData[rowIdx].slice(0, rowIdx + 1);
      const rowSum = rowSums[rowIdx];
      const alternatingRowSum = alternatingRowSums[rowIdx];
      let offset = 0;
      if (matrixData.length === matrixData[0].length) {
        offset = 1;
      }
      return (
        <tr key={"row-" + rowIdx}>
          <td key={"oeis-row-" + rowIdx} className={classes.MatrixCell}>
            <a
              target="_blank"
              href={
                "http://oeis.org/search?q=" +
                subsequence.join("%2C") +
                "&language=english&go=Search"
              }
            >
              <button> OEIS </button>
            </a>
          </td>
          {matrixData[0].map((elem, colIdx) => {
            return (
              <td
                key={"table-" + rowIdx + "-" + colIdx}
                className={classes.MatrixCell}
              >
                {matrixData[rowIdx][colIdx]}
              </td>
            );
          })}
          {this.state.renderRowSums ? (
            <td key={"rowSum-" + rowIdx} className={classes.RowSumCell}>
              {rowIdx < matrixData[0].length - offset ? rowSum : "--"}
            </td>
          ) : null}
          {this.state.renderRowSums ? (
            <td
              key={"alternatingRowSum-" + rowIdx}
              className={classes.AlternatingRowSumCell}
            >
              {rowIdx < matrixData[0].length - offset
                ? alternatingRowSum
                : "--"}
            </td>
          ) : null}
        </tr>
      );
    });

    return (
      <div>
        <table className={classes.MatrixTable}>
          <tbody>
            <tr key={"oeis-row"}>
              <td key={"oeis--1"} className={classes.MatrixCell}>
                {""}
              </td>
              {oeisRow}
            </tr>
            {tableRows}
          </tbody>
        </table>
        {showRowSumsCheckbox}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  
  return {
    numCellsToDisplay: state.calc.numCellsToDisplay,
    loadingMatrix: state.calc.loadingMatrix,
    riordanGroupElem: state.calc.riordan_group_elem,
    exponential: state.calc.exponential,
    exponentialstieltjes: state.calc.exponentialstieltjes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    onSelectSequence: (sequenceId, sequenceName) =>
      dispatch(actions.selectSequence(sequenceId, sequenceName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixTable);
