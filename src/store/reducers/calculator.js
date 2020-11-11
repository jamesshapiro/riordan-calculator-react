import * as actionTypes from '../actions/calcActionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    gSequence: {
        sequenceId: 'g',
        sequenceName: 'catalan',
        sequenceIsFreeform: false,
        leadingZeroes: 0
    },
    fSequence: {
        sequenceId: 'f',
        sequenceName: 'catalan',
        sequenceIsFreeform: false,
        leadingZeroes: 1
    },
    numCellsToDisplay: 11 
};

const setSequence = (state, action) => {
    const sequenceId = action.sequenceId;
    let sequenceIsFreeform = false;
    if (action.sequenceName === 'freeform') {
        sequenceIsFreeform = true;
    }
    const newSequence = {
        sequenceId: action.sequenceId,
        sequenceName: action.sequenceName,
        sequenceIsFreeform: sequenceIsFreeform,
        leadingZeroes: 0
    }
    if (sequenceId === 'g') {
        return updateObject(state, { gSequence: newSequence });
    }
    return updateObject(state, { fSequence: newSequence });
}

const addZero = (state, action) => {
    let sequence = action.sequence;
    if (action.sequence.sequenceId === 'g') {
        console.log('SEQUENCE ID IS G')
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
    console.log('SEQUENCE ID IS F')
    const newZeroes = state.fSequence.leadingZeroes + 1
    return {
        ...state,
        fSequence: {
            ...state.fSequence,
            leadingZeroes: newZeroes
        }
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEQUENCE: return setSequence(state, action);
        case actionTypes.ADD_ZERO: return addZero(state, action);
        default: return state;
    }
};

export default reducer;