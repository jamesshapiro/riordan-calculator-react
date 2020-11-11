import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/calcIndex';
import { sequenceMap, sequenceNames } from '../../data/sequenceData';
import SequenceSelector from './SequenceSelector/SequenceSelector';
import SequenceButton from './SequenceButton/SequenceButton';
import Sequence from './Sequence/Sequence';
import classes from './SequenceContainer.module.css';

class SequenceContainer extends Component {
    state = {
        elementConfig: {
            options: sequenceNames.map(sequenceName => {
                return { value: sequenceName, displayValue: sequenceName };
            })
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        this.props.onSetSequence(this.props.sequence.sequenceId, event.target.value, this.props.sequence.leadingZeroes)
    }

    addLeadingZero(sequence) {
        this.props.onAddZero(sequence);
    }

    displayFewerTerms() {
        this.props.onDisplayFewerTerms()
    }

    displayMoreTerms() {
        this.props.onDisplayMoreTerms()
    }

    render() {
        let seq = Array(this.props.sequence.leadingZeroes).fill(0)
        seq = seq.concat(sequenceMap[this.props.sequence.sequenceName]);

        const shiftButton = (<SequenceButton
            clicked={() => this.addLeadingZero(this.props.sequence)}
            content="+0"
        />)

        const addTermButton = (<SequenceButton
            clicked={() => this.displayMoreTerms()}
            content="+"
        />)

        const deleteTermButton = (<SequenceButton
            clicked={() => this.displayFewerTerms()}
            disabled={!this.props.enableDisplayFewerButton}
            content="-"
        />)

        const sequenceSelector = (
            <SequenceSelector
                label={this.props.sequence.sequenceId + '-sequence: '}
                elementConfig={this.state.elementConfig}
                selectedSequence={this.props.sequence.sequenceName}
                changed={(event) => this.inputChangedHandler(event, 1)}
            />
        )

        const sequence = <Sequence sequence={seq} />

        return (
            <div className={classes.SequenceContainer}>
                <div>{sequenceSelector}{shiftButton}{sequence}{addTermButton}{deleteTermButton}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // token: state.auth.token,
        // sequence: state.calc.gSequence,
        numCellsToDisplay: state.calc.numCellsToDisplay,
        enableDisplayFewerButton: state.calc.numCellsToDisplay > 0
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSetSequence: (sequenceId, sequenceName, leadingZeroes) => dispatch(actions.setSequence(sequenceId, sequenceName, leadingZeroes)),
        onAddZero: (sequence) => dispatch(actions.addZero(sequence)),
        onDisplayFewerTerms: () => dispatch(actions.displayFewerTerms()),
        onDisplayMoreTerms: () => dispatch(actions.displayMoreTerms())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceContainer);