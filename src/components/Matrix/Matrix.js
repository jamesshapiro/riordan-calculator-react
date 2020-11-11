import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/calcIndex';
import Spinner from '../UI/Spinner/Spinner'
import MatrixTable from './MatrixTable/MatrixTable'

class SequenceContainer extends Component {
    state = {

    }

    render() {
        const matrixSelector = this.props.matrixSelector
        let matrixData = null
        switch (matrixSelector) {
            case 'riordan':
                matrixData = this.props.riordanGroupElem
                break;
        
            default:
                break;
        }
        let matrix = null;
        if (this.props.loadingMatrix) {
            matrix = <Spinner />
        }
        if (matrixData) {
            matrix = <MatrixTable matrixData={matrixData} />
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
        riordanGroupElem: state.calc.riordan_group_elem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSelectSequence: (sequenceId, sequenceName) => dispatch(actions.selectSequence(sequenceId, sequenceName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceContainer);