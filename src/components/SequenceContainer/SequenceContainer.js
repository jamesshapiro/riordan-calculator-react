import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/calcIndex";
import { sequenceNames } from "../../data/sequenceData";
import { expSequenceNames } from '../../data/expSequenceData'
import SequenceSelector from "./SequenceSelector/SequenceSelector";
import SequenceButton from "./SequenceButton/SequenceButton";
import SequenceCell from "./SequenceCell/SequenceCell";
import classes from "./SequenceContainer.module.css";

class SequenceContainer extends Component {
  isExponential = () => {
    return (
      window.location.toString().toLowerCase().includes('exponential') ||
      window.location.toString().toLowerCase().includes('localhost:3000')
    )
  }

  getSequenceNames = () => {
    if (this.isExponential()) {
      return expSequenceNames
    } else {
      return sequenceNames
    }
  }

  state = {
    options: this.getSequenceNames().map((sequenceName) => {
      return {
        value: this.titleCase(sequenceName),
        displayValue: this.titleCase(sequenceName),
      }
    }),
    sequenceId: this.props.sequence.sequenceId,
    selectorValue: '',
    storedValue: '',
  }

  titleCase(str) {
    str = str.toLowerCase().split(' ')
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1)
    }
    return str.join(' ')
  }

  addLeadingZero() {
    const seqCopy = this.props.sequence.sequence.slice()
    const newArray = [0].concat(seqCopy)
    this.setState({ sequence: newArray })
    this.props.onSetCustomSequence(this.state.sequenceId, newArray)
  }

  chopFirst() {
    const seqCopy = this.props.sequence.sequence.slice()
    const newArray = seqCopy.slice(1)
    this.setState({ sequence: newArray })
    this.props.onSetCustomSequence(this.state.sequenceId, newArray)
  }

  isInteger = (input) => {
    if (input.length === 0) {
      return false
    }
    return /^\d+$/.test(input)
  }

  isValidOEISSequenceID = (sequenceId) => {
    if (sequenceId.length === 6) {
      return this.isInteger(sequenceId)
    } else if (sequenceId.length === 7) {
      if (sequenceId.slice(0, 1).toLowerCase() === 'a') {
        return this.isInteger(sequenceId.slice(1))
      } else {
        return false
      }
    }
    return false
  }

  formatOEISSequenceId = (sequenceId) => {
    if (sequenceId.length === 6) {
      return 'A' + sequenceId
    } else {
      return 'A' + sequenceId.slice(1)
    }
  }

  isValidCustomSequence = (input) => {
    if ((input.match(/,/g) || []).length < 2) {
      return false
    }
    const nospaces = input.replace(/\s/g, '')
    const integers = nospaces.split(',')
    for (let x of integers) {
      if (!this.isInteger(x)) {
        return false
      }
    }
    return true
  }

  sequenceSelectHandler = (event) => {
    this.setState({
      storedValue: event.target.value,
      selectorValue: event.target.value,
    })
    const lowercased = event.target.value.toLowerCase()
    if (this.getSequenceNames().includes(lowercased)) {
      this.props.onSelectSequence(this.state.sequenceId, lowercased)
    } else if (this.isValidOEISSequenceID(event.target.value)) {
      this.props.onSetOEISSequence(
        this.state.sequenceId,
        this.formatOEISSequenceId(event.target.value)
      )
    } else if (this.isValidCustomSequence(event.target.value)) {
      const newSequence = event.target.value.split(',').map((strInput) => {
        return parseInt(strInput)
      })
      this.props.onSetCustomSequence(this.state.sequenceId, newSequence, true)
    }
  }

  displayFewerTerms() {
    this.props.onDisplayFewerTerms()
  }

  displayMoreTerms() {
    this.props.onDisplayMoreTerms()
  }

  sequenceClicked(sequenceSelector) {
    this.setState({ selectorValue: '' })
  }

  sequenceUnclicked() {
    this.setState({ selectorValue: this.state.storedValue })
  }

  render() {
    const addTermButton = (
      <SequenceButton
        clicked={() => this.displayMoreTerms()}
        disabled={
          this.props.disableControls ||
          this.props.maxDisplayableCells <= this.props.numCellsToDisplay
        }
        content="+"
      />
    )

    const deleteTermButton = (
      <SequenceButton
        clicked={() => this.displayFewerTerms()}
        disabled={
          this.props.disableControls || !this.props.enableDisplayFewerButton
        }
        content="-"
      />
    )

    const sequenceSelector = (
      <SequenceSelector
        label={this.state.sequenceId + ': '}
        options={this.state.options}
        value={this.props.disableControls ? '' : this.state.selectorValue}
        selectedSequence={this.props.sequence.sequenceName}
        changed={(event) => this.sequenceSelectHandler(event)}
        clicked={(sequenceSelector) => this.sequenceClicked(sequenceSelector)}
        unclicked={() => this.sequenceUnclicked()}
        disableControls={this.props.disableControls}
      />
    )

    const shiftButton = (
      <SequenceButton
        clicked={() => this.addLeadingZero()}
        content="+0"
        disabled={this.props.disableControls}
      />
    )

    const backshiftButton = (
      <SequenceButton
        clicked={() => this.chopFirst()}
        content="&lt;"
        disabled={this.props.disableControls}
      />
    )

    let sequence = this.props.sequence.sequence
      .slice(0, this.props.numCellsToDisplay)
      .map((seqValue, idx) => {
        return (
          <SequenceCell
            key={idx}
            index={idx}
            value={seqValue}
            changed={(itemIdx, newValue) => this.changed(itemIdx, newValue)}
          />
        )
      })

    let className = classes.SequenceContainer
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

const mapStateToProps = (state) => {
  return {
    // token: state.auth.token,
    // sequence: state.calc.gSequence,
    numCellsToDisplay: state.calc.numCellsToDisplay,
    enableDisplayFewerButton: state.calc.numCellsToDisplay > 0,
    maxDisplayableCells: state.calc.maxDisplayableCells,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSequence: (sequenceId, sequenceName) =>
      dispatch(actions.selectSequence(sequenceId, sequenceName)),
    onDisplayFewerTerms: () => dispatch(actions.displayFewerTerms()),
    onDisplayMoreTerms: () => dispatch(actions.displayMoreTerms()),
    onSetCustomSequence: (sequenceId, sequence, isNewSequence) =>
      dispatch(actions.setCustomSequence(sequenceId, sequence, isNewSequence)),
    onSetOEISSequence: (sequenceId, oeisSequenceId) =>
      dispatch(actions.fetchOEISSequence(sequenceId, oeisSequenceId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SequenceContainer);
