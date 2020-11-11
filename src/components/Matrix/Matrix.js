import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/calcIndex';
import Spinner from '../UI/Spinner/Spinner'
import MatrixTable from './MatrixTable/MatrixTable'

class Matrix extends Component {
    state = {

    }

    render() {
        const matrixSelector = this.props.matrixSelector
        let matrixData = null
        switch (matrixSelector) {
            case 'riordan':
                matrixData = this.props.riordanGroupElem
                break;
            case 'stieltjes':
                matrixData = this.props.stieltjes
            default:
                break;
        }
        let matrix = null;
        if (this.props.loadingMatrix) {
            matrix = <Spinner />
        }
        if (matrixData) {
            matrix = (
                <div>
                    <h1>{this.props.matrixName}</h1>
                    <MatrixTable matrixData={matrixData} />
                </div>
            )
        }
        return (
            <div>
                {matrix}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        numCellsToDisplay: state.calc.numCellsToDisplay,
        loadingMatrix: state.calc.loadingMatrix,
        riordanGroupElem: state.calc.riordan_group_elem,
        stieltjes: state.calc.stieltjes
    }
}

export default connect(mapStateToProps)(Matrix);