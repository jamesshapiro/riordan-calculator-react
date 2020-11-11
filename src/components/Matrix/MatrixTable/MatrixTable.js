import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/calcIndex';
import classes from './MatrixTable.module.css';

class MatrixTable extends Component {
    render() {
        const matrixData = this.props.matrixData;
        const oeisRow = matrixData[0].map((elem, index) => {
            const subsequence = matrixData.slice(index).map(row => row[index])
            return (
                <td key={"oeis-" + index} className={classes.MatrixCell}>
                    <a
                        target="_blank"
                        href={"http://oeis.org/search?q=" + subsequence.join("%2C") + "&language=english&go=Search"} >
                        <button> OEIS </button>
                    </a>
                </td>
            )
        })

        const tableRows = matrixData.map((row, rowIdx) => {
            const subsequence = matrixData[rowIdx].slice(0, rowIdx + 1)
            return (
                <tr key={"row-" + rowIdx}>
                    <td key={"oeis-row-" + rowIdx} className={classes.MatrixCell}>
                        <a
                            target="_blank"
                            href={"http://oeis.org/search?q=" + subsequence.join("%2C") + "&language=english&go=Search"} >
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
                        )
                    })}
                </tr>
            )
        })

        return (
            <div>
                <table className={classes.MatrixTable}>
                    <tbody>
                        <tr key={"oeis-row"}>
                            <td key={"oeis--1"} className={classes.MatrixCell}>{""}</td>
                            {oeisRow}
                        </tr>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        numCellsToDisplay: state.calc.numCellsToDisplay,
        loadingMatrix: state.calc.loadingMatrix,
        riordanGroupElem: state.calc.riordan_group_elem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSelectSequence: (sequenceId, sequenceName) => dispatch(actions.selectSequence(sequenceId, sequenceName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MatrixTable);