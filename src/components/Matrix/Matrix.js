import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/calcIndex';
import Spinner from '../UI/Spinner/Spinner'

class SequenceContainer extends Component {
    state = {

    }

    render() {
        let matrix = null;
        if (this.props.loadingMatrix) {
            matrix = <Spinner />
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
        loadingMatrix: state.calc.loadingMatrix
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSelectSequence: (sequenceId, sequenceName) => dispatch(actions.selectSequence(sequenceId, sequenceName)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceContainer);