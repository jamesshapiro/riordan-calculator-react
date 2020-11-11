import * as actionTypes from '../actions/calcActionTypes';
import { updateObject } from '../../shared/utility';
import { sequenceMap, sequenceNames } from '../../data/sequenceData';

const initialState = {
    gSequence: {
        sequenceId: 'g',
        sequenceName: 'catalan',
        sequenceIsFreeform: false,
        leadingZeroes: 0,
        sequence: sequenceMap['catalan']
    },
    fSequence: {
        sequenceId: 'f',
        sequenceName: 'catalan',
        sequenceIsFreeform: false,
        leadingZeroes: 1,
        sequence: sequenceMap['catalan']
    },
    numCellsToDisplay: 11,
    maxDisplayableCells: Math.min(sequenceMap['catalan'].length, sequenceMap['catalan'].length)
};

const setSequence = (state, action) => {
    console.log(action.sequenceId);
    const sequenceId = action.sequenceId;
    let sequenceIsFreeform = false;
    if (action.sequenceName === 'freeform') {
        sequenceIsFreeform = true;
    }
    let newSequence = {
        sequenceId: action.sequenceId,
        sequenceName: action.sequenceName,
        sequenceIsFreeform: sequenceIsFreeform,
        leadingZeroes: 0
    }
    if (sequenceId === 'g') {
        let newSequence = {
            ...state.gSequence,
            sequenceName: action.sequenceName,
            sequence: sequenceMap[action.sequenceName],
            leadingZeroes: 0
        }
        console.log(Math.min(newSequence.sequence.length, state.fSequence.sequence.length))
        return updateObject(state, { 
            gSequence: newSequence,
            maxDisplayableCells: Math.min(newSequence.sequence.length, state.fSequence.sequence.length),
            numCellsToDisplay: Math.min(newSequence.sequence.length, state.numCellsToDisplay)
        });
    } else {
        let newSequence = {
            ...state.fSequence,
            sequenceName: action.sequenceName,
            sequence: sequenceMap[action.sequenceName],
            leadingZeroes: 0
        }
        console.log(Math.min(newSequence.sequence.length, state.gSequence.sequence.length))
        return updateObject(state, {
            fSequence: newSequence,
            maxDisplayableCells: Math.min(newSequence.sequence.length, state.gSequence.sequence.length),
            numCellsToDisplay: Math.min(newSequence.sequence.length, state.numCellsToDisplay)
        });
    }
    
}

const addZero = (state, action) => {
    let sequence = action.sequence;
    if (action.sequence.sequenceId === 'g') {
        const newZeroes = state.gSequence.leadingZeroes + 1
        console.log(newZeroes)
        return {
            ...state,
            gSequence: {
                ...state.gSequence,
                leadingZeroes: newZeroes
            }
        }
    }
    const newZeroes = state.fSequence.leadingZeroes + 1
    return {
        ...state,
        fSequence: {
            ...state.fSequence,
            leadingZeroes: newZeroes
        }
    }
}

const displayFewerTerms = (state, action) => {
    const newNumCellsToDisplay = state.numCellsToDisplay - 1;
    return updateObject(state, { numCellsToDisplay: newNumCellsToDisplay });
}

const displayMoreTerms = (state, action) => {
    const newNumCellsToDisplay = state.numCellsToDisplay + 1;
    return updateObject(state, { numCellsToDisplay: newNumCellsToDisplay });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEQUENCE: return setSequence(state, action);
        case actionTypes.ADD_ZERO: return addZero(state, action);
        case actionTypes.DISPLAY_FEWER_TERMS: return displayFewerTerms(state, action);
        case actionTypes.DISPLAY_MORE_TERMS: return displayMoreTerms(state, action);
        default: return state;
    }
};

export default reducer;