import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/calcIndex';
import { sequenceMap, sequenceNames } from '../../data/sequenceData';
import SequenceSelector from './SequenceSelector/SequenceSelector';
import SequenceButton from './SequenceButton/SequenceButton';
import SequenceCell from './Sequence/SequenceCell/SequenceCell';
import classes from './SequenceContainer.module.css';

class SequenceContainer extends Component {
    state = {
        options: sequenceNames.map(sequenceName => {
            return { value: this.titleCase(sequenceName), displayValue: this.titleCase(sequenceName) };
        }),
        sequenceId: this.props.sequence.sequenceId,
        sequence: Array(this.props.sequence.leadingZeroes).fill(0).concat(this.props.sequence.sequence)
    }

    titleCase(str) {
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }
        return str.join(' ');
    }

    addLeadingZero() {
        const seqCopy = this.state.sequence.slice();
        const newArray = [0].concat(seqCopy)
        this.setState({ sequence: newArray })
        this.props.onSetCustomSequence(this.state.sequenceId, newArray)
    }

    chopFirst() {
        const seqCopy = this.state.sequence.slice();
        const newArray = seqCopy.slice(1);
        this.setState({ sequence: newArray })
        this.props.onSetCustomSequence(this.state.sequenceId, newArray)
    }

    changed = (itemIdx, newValue) => {
        const seqCopy = this.state.sequence.slice(0, this.props.numCellsToDisplay);
        seqCopy[itemIdx] = +newValue;
        console.log(seqCopy);
        this.setState({ sequence: seqCopy })
        this.props.onSetCustomSequence(this.state.sequenceId, seqCopy)
    }

    sequenceSelectHandler = (event, inputIdentifier) => {
        const lowercased = event.target.value.toLowerCase()
        const leadingZeroes = []
        if (this.state.sequenceId === 'f')
        leadingZeroes.push(0)
        if (sequenceNames.includes(lowercased)) {
            this.setState({ sequence: leadingZeroes.concat(sequenceMap[lowercased]) });
            this.props.onSelectSequence(this.state.sequenceId, lowercased);
        }
    }

    setValues = selectValues => {
        this.props.onSetSequence(this.state.sequenceId, selectValues[0])
        //this.setState({ selectValues });
    }

    displayFewerTerms() {
        this.props.onDisplayFewerTerms()
    }

    displayMoreTerms() {
        this.props.onDisplayMoreTerms()
    }

    render() {
        const addTermButton = (<SequenceButton
            clicked={() => this.displayMoreTerms()}
            disabled={this.props.maxDisplayableCells <= this.props.numCellsToDisplay}
            content="+"
        />)

        const deleteTermButton = (<SequenceButton
            clicked={() => this.displayFewerTerms()}
            disabled={!this.props.enableDisplayFewerButton}
            content="-"
        />)

        const sequenceSelector = (
            <SequenceSelector
                label={this.state.sequenceId + ': '}
                options={this.state.options}
                selectedSequence={this.state.sequence.sequenceName}
                changed={(event) => this.sequenceSelectHandler(event, 1)}
            />
        )

        const shiftButton = (<SequenceButton
            clicked={() => this.addLeadingZero()}
            content="+0"
        />)

        const backshiftButton = (<SequenceButton
            clicked={() => this.chopFirst()}
            content="&lt;"
        />)

        const sequence = this.state.sequence.slice(0, this.props.numCellsToDisplay).map((seqValue, idx) => {
            return <SequenceCell
                key={idx}
                index={idx}
                value={seqValue}
                changed={(itemIdx, newValue) => this.changed(itemIdx, newValue)}
            />
        })

        let className= classes.SequenceContainer
        if (this.state.sequenceId === 'f') {
            className = classes.FSequenceContainer
        }

        return (
            <div className={className}>
                {sequenceSelector}
                {shiftButton}
                {backshiftButton}
                {addTermButton}
                {deleteTermButton}
                <span className={classes.Sequence}>{sequence}</span>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // token: state.auth.token,
        // sequence: state.calc.gSequence,
        numCellsToDisplay: state.calc.numCellsToDisplay,
        enableDisplayFewerButton: state.calc.numCellsToDisplay > 0,
        maxDisplayableCells: state.calc.maxDisplayableCells
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
        onSelectSequence: (sequenceId, sequenceName) => dispatch(actions.selectSequence(sequenceId, sequenceName)),
        onDisplayFewerTerms: () => dispatch(actions.displayFewerTerms()),
        onDisplayMoreTerms: () => dispatch(actions.displayMoreTerms()),
        onSetCustomSequence: (sequenceId, sequence) => dispatch(actions.setCustomSequence(sequenceId, sequence)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceContainer);