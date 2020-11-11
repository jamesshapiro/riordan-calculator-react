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
    loadingMatrix: false,
    a_seq: null,
    b_seq: null,
    riordan_group_elem: null,
    riordan_pseudo: true,
    stieltjes: null,
    tweedle_left: null,
    tweedle_left_a_seq: null,
    tweedle_left_b_seq: null,
    tweedle_left_pseudo: true,
    tweedle_left_z_seq: null,
    tweedle_right: null,
    tweedle_right_a_seq: null,
    tweedle_right_b_seq: null,
    tweedle_right_pseudo: true,
    tweedle_right_z_seq: null,
    z_seq: null
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
                newZeroes + state.gSequence.sequence.length,
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
                newZeroes + state.fSequence.sequence.length
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

const fetchMatrixSuccess = (state, action) => {
    const json_body = action.json_body;

    return updateObject(state, {
        loadingMatrix: false,
        a_seq: json_body['a seq'],
        b_seq: json_body['b seq'],
        riordan_group_elem: json_body['riordan group elem'],
        riordan_pseudo: json_body['riordan pseudo'],
        stieltjes: json_body.stieltjes,
        tweedle_left: json_body['tweedle left'],
        tweedle_left_a_seq: json_body['tweedle left a seq'],
        tweedle_left_b_seq: json_body['tweedle left b seq'],
        tweedle_left_pseudo: json_body['tweedle left pseudo'],
        tweedle_left_z_seq: json_body['tweedle left z seq'],
        tweedle_right: json_body['tweedle right'],
        tweedle_right_a_seq: json_body['tweedle right a seq'],
        tweedle_right_b_seq: json_body['tweedle right b seq'],
        tweedle_right_pseudo: json_body['tweedle right pseudo'],
        tweedle_right_z_seq: json_body['tweedle right z seq'],
        z_seq: json_body['z seq']
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_SEQUENCE: return selectSequence(state, action);
        case actionTypes.SET_CUSTOM_SEQUENCE: return setCustomSequence(state, action);
        case actionTypes.ADD_ZERO: return addZero(state, action);
        case actionTypes.DISPLAY_FEWER_TERMS: return displayFewerTerms(state, action);
        case actionTypes.DISPLAY_MORE_TERMS: return displayMoreTerms(state, action);
        case actionTypes.FETCH_MATRIX_START: return updateObject(state, { loadingMatrix: true });
        case actionTypes.FETCH_MATRIX_SUCCESS: return fetchMatrixSuccess(state, action);
        case actionTypes.FETCH_MATRIX_FAIL: return updateObject(state, { loadingMatrix: false });
        default: return state;
    }
};

export default reducer;