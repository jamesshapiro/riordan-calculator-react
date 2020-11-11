import * as actionTypes from '../actions/calcActionTypes';
import { updateObject } from '../../shared/utility';
import { sequenceMap } from '../../data/sequenceData';

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
    maxDisplayableCells: Math.min(0 + sequenceMap['catalan'].length, 1 + sequenceMap['catalan'].length),
    loading: false
};

const setCustomSequence = (state, action) => {
    console.log('[SET Custom Sequence]');
    console.log(action);
    const sequenceId = action.sequenceId;
    if (sequenceId === 'g') {
        let newSequence = {
            ...state.gSequence,
            sequenceName: 'custom',
            sequence: action.sequence,
            leadingZeroes: 0
        }
        return updateObject(state, {
            gSequence: newSequence,
            maxDisplayableCells: Math.min(newSequence.sequence.length, state.fSequence.sequence.length),
            numCellsToDisplay: Math.min(newSequence.sequence.length, state.numCellsToDisplay)
        });
    } else {
        let newSequence = {
            ...state.fSequence,
            sequenceName: 'custom',
            sequence: action.sequence,
            leadingZeroes: 0
        }
        return updateObject(state, {
            fSequence: newSequence,
            maxDisplayableCells: Math.min(newSequence.sequence.length, state.gSequence.sequence.length),
            numCellsToDisplay: Math.min(newSequence.sequence.length, state.numCellsToDisplay)
        });
    }
}

const selectSequence = (state, action) => {
    const sequenceId = action.sequenceId;
    if (sequenceId === 'g') {
        let newSequence = {
            ...state.gSequence,
            sequenceName: action.sequenceName,
            sequence: sequenceMap[action.sequenceName],
            leadingZeroes: 0
        }
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
        return updateObject(state, {
            fSequence: newSequence,
            maxDisplayableCells: Math.min(newSequence.sequence.length, state.gSequence.sequence.length),
            numCellsToDisplay: Math.min(newSequence.sequence.length, state.numCellsToDisplay)
        });
    }
}

const addZero = (state, action) => {
    if (action.sequenceId === 'g') {
        const newZeroes = state.gSequence.leadingZeroes + 1
        return {
            ...state,
            gSequence: {
                ...state.gSequence,
                leadingZeroes: newZeroes
            },
            maxDisplayableCells: Math.min(
                newZeroes                     + state.gSequence.sequence.length, 
                state.fSequence.leadingZeroes + state.fSequence.sequence.length
            )
        }
    } else {
        const newZeroes = state.fSequence.leadingZeroes + 1
        return {
            ...state,
            fSequence: {
                ...state.fSequence,
                leadingZeroes: newZeroes
            },
            maxDisplayableCells: Math.min(
                state.gSequence.leadingZeroes + state.gSequence.sequence.length, 
                newZeroes                     + state.fSequence.sequence.length
            )
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
        case actionTypes.SELECT_SEQUENCE: return selectSequence(state, action);
        case actionTypes.SET_CUSTOM_SEQUENCE: return setCustomSequence(state, action);
        case actionTypes.ADD_ZERO: return addZero(state, action);
        case actionTypes.DISPLAY_FEWER_TERMS: return displayFewerTerms(state, action);
        case actionTypes.DISPLAY_MORE_TERMS: return displayMoreTerms(state, action);
        default: return state;
    }
};

export default reducer;