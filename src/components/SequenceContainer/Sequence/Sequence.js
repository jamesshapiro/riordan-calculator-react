import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/calcIndex'
import classes from './Sequence.module.css';
import SequenceCell from './SequenceCell/SequenceCell';
import SequenceButton from '../SequenceButton/SequenceButton'

class Sequence extends Component {
    state = {
        sequenceId: this.props.sequenceId,
        sequence: this.props.sequence
    }

    addLeadingZero(sequence) {
        const seqCopy = this.state.sequence.slice();
        const newArray = [0].concat(seqCopy)
        this.setState({sequence: newArray})
        this.props.onAddZero(this.props.sequenceId);
    }

    changed = (itemIdx, newValue) => {
        const seqCopy = this.state.sequence.slice();
        seqCopy[itemIdx] = +newValue;
        console.log(seqCopy);
        this.setState({sequence: seqCopy})
        this.props.onSetCustomSequence(this.state.sequenceId, seqCopy)
    }

    render () {

        const shiftButton = (<SequenceButton
            clicked={() => this.addLeadingZero(this.props.sequence)}
            content="+0"
        />)
        console.log("SEQUENCE RENDER: ")
        const sequence = this.state.sequence.slice(0, this.props.numCellsToDisplay).map((seqValue, idx) => {
            return <SequenceCell 
                key={idx}
                index={idx}
                value={seqValue}
                changed={(itemIdx, newValue) => this.changed(itemIdx, newValue)}
            />
        })

        return (
            <div className={classes.Sequence}>
                {shiftButton}{sequence}
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        numCellsToDisplay: state.calc.numCellsToDisplay,
        gLeadingZeroes: state.calc.gSequence.gLeadingZeroes,
        fLeadingZeroes: state.calc.fSequence.fLeadingZeroes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetCustomSequence: (sequenceId, sequence) => dispatch(actions.setCustomSequence(sequenceId, sequence)),
        onAddZero: (sequenceId) => dispatch(actions.addZero(sequenceId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sequence);