import * as actionTypes from './calcActionTypes';
//import axios from 'axios';

export const selectSeq = ( sequenceId, sequenceName ) => {
    return {
        type: actionTypes.SELECT_SEQUENCE,
        sequenceId: sequenceId,
        sequenceName: sequenceName
    };
}

export const selectSequence = ( sequenceId, sequenceName ) => {
    return dispatch => {
        dispatch(selectSeq(sequenceId, sequenceName));
    };
};

export const setCustomSeq = ( sequenceId, sequence ) => {
    return {
        type: actionTypes.SET_CUSTOM_SEQUENCE,
        sequenceId: sequenceId,
        sequence: sequence
    };
}

export const setCustomSequence = ( sequenceId, sequence ) => {
    return dispatch => {
        dispatch(setCustomSeq(sequenceId, sequence));
    };
};

export const addLeadingZero = ( sequenceId ) => {
    return {
        type: actionTypes.ADD_ZERO,
        sequenceId: sequenceId
    };
}

export const addZero = ( sequenceId ) => {
    return dispatch => {
        dispatch(addLeadingZero(sequenceId));
    };
};

export const displayOneFewerTerms = () => {
    return {
        type: actionTypes.DISPLAY_FEWER_TERMS
    };
}

export const displayFewerTerms = () => {
    return dispatch => {
        dispatch(displayOneFewerTerms());
    }
}

export const displayOneMoreTerms = () => {
    return {
        type: actionTypes.DISPLAY_MORE_TERMS
    };
}


export const displayMoreTerms = () => {
    return dispatch => {
        dispatch(displayOneMoreTerms());
    }
}