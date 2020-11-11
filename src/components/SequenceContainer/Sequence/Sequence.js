import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/calcIndex'
import classes from './Sequence.module.css';
import SequenceCell from './SequenceCell/SequenceCell';

const changed = () => {
    return
}

class Sequence extends Component {
    //console.log(props.sequence)
    render () {
        const sequence = this.props.sequence.slice(0, this.props.numCellsToDisplay).map((seqValue, index) => {
            return <SequenceCell 
                key={index}
                value={seqValue}
                changed={() => this.changed()}
            />
        })
        //console.log(sequence)

        return (
            <div className={classes.Sequence}>
                {sequence}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        numCellsToDisplay: state.calc.numCellsToDisplay
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSetSequence: (sequenceId, sequenceName, leadingZeroes) => dispatch(actions.setSequence(sequenceId, sequenceName, leadingZeroes)),
        onAddZero: (sequence) => dispatch(actions.addZero(sequence))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sequence);