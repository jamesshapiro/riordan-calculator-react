import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/calcIndex';
import { sequenceMap, sequenceNames } from '../../data/sequenceData';
import SequenceSelector from './SequenceSelector/SequenceSelector';
import SequenceButton from './SequenceButton/SequenceButton';

class Sequence extends Component {
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

    render() {
        let seq = Array(this.props.sequence.leadingZeroes).fill(0)
        seq = seq.concat(sequenceMap[this.props.sequence.sequenceName]);

        const shiftButton = (<SequenceButton
            clicked={() => this.addLeadingZero(this.props.sequence)}
            content="&gt;&gt;"
        />)

        const sequenceSelector = (
            <SequenceSelector
                label={this.props.sequence.sequenceId + '-sequence'}
                elementConfig={this.state.elementConfig}
                changed={(event) => this.inputChangedHandler(event, 1)}
            />
        )

        return (
            <div>
                <div>{sequenceSelector}{shiftButton}{seq.join(', ')}</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // token: state.auth.token,
        // sequence: state.calc.gSequence
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