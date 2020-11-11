import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-dropdown-select';


import * as actions from '../../store/actions/calcIndex';
import { sequenceMap, sequenceNames } from '../../data/sequenceData';
import SequenceSelector from './SequenceSelector/SequenceSelector';
import SequenceButton from './SequenceButton/SequenceButton';
import Sequence from './Sequence/Sequence';
import classes from './SequenceContainer.module.css';
import { options } from "../../data/options";

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
                label={this.props.sequence.sequenceId + '-sequence: '}
                elementConfig={this.state.elementConfig}
                selectedSequence={this.props.sequence.sequenceName}
                changed={(event) => this.inputChangedHandler(event, 1)}
            />
        )

        const sequence = <Sequence sequence={seq} />

        const bsProps = {
            multi: false,
            disabled: false,
            loading: false,
            contentRenderer: false,
            dropdownRenderer: false,
            inputRenderer: false,
            itemRenderer: false,
            optionRenderer: false,
            noDataRenderer: false,
            selectValues: [],
            searchBy: "username",
            clearable: false,
            searchable: true,
            create: false,
            separator: false,
            forceOpen: false,
            handle: true,
            addPlaceholder: " (select a preset or search by OEIS id, e.g. A000055)",
            labelField: "username",
            valueField: "email",
            color: "#0074D9",
            keepSelectedInList: true,
            closeOnSelect: false,
            dropdownPosition: "bottom",
            direction: "ltr",
            dropdownHeight: "300px"
        }

        const bigSelect = (<Select
            placeholder="Select peoples"
            addPlaceholder={bsProps.addPlaceholder}
            color={bsProps.color}
            disabled={bsProps.disabled}
            loading={bsProps.loading}
            searchBy={bsProps.searchBy}
            separator={bsProps.separator}
            clearable={bsProps.clearable}
            searchable={bsProps.searchable}
            create={bsProps.create}
            keepOpen={bsProps.forceOpen}
            dropdownHandle={bsProps.handle}
            dropdownHeight={bsProps.dropdownHeight}
            direction={bsProps.direction}
            multi={bsProps.multi}
            values={[options.find(opt => opt.username === "Delphine")]}
            labelField={bsProps.labelField}
            valueField={bsProps.valueField}
            options={options}
            dropdownGap={5}
            keepSelectedInList={bsProps.keepSelectedInList}
            onDropdownOpen={() => undefined}
            onDropdownClose={() => undefined}
            onClearAll={() => undefined}
            onSelectAll={() => undefined}
            onChange={values => this.setValues(values)}
            noDataLabel="No matches found"
            closeOnSelect={bsProps.closeOnSelect}
            />
        )

            return (
                <div className={classes.SequenceContainer}>
                    <div>{sequenceSelector}{shiftButton}{addTermButton}{deleteTermButton}{sequence}</div>
                    {bigSelect}
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
        onSetSequence: (sequenceId, sequenceName, leadingZeroes) => dispatch(actions.setSequence(sequenceId, sequenceName, leadingZeroes)),
        onAddZero: (sequence) => dispatch(actions.addZero(sequence)),
        onDisplayFewerTerms: () => dispatch(actions.displayFewerTerms()),
        onDisplayMoreTerms: () => dispatch(actions.displayMoreTerms())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceContainer);