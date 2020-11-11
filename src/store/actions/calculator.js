import * as actionTypes from './calcActionTypes';
//import axios from 'axios';

export const setSeq = ( sequenceId, sequenceName, leadingZeroes ) => {
    return {
        type: actionTypes.SET_SEQUENCE,
        sequenceId: sequenceId,
        sequenceName: sequenceName,
        leadingZeroes: leadingZeroes
    };
}

export const setSequence = ( sequenceId, sequenceName, leadingZeroes ) => {
    return dispatch => {
        dispatch(setSeq(sequenceId, sequenceName, leadingZeroes));
    };
};

export const addLeadingZero = ( sequence, sequenceName, leadingZeroes ) => {
    return {
        type: actionTypes.ADD_ZERO,
        sequence: sequence
    };
}

export const addZero = ( sequence ) => {
    return dispatch => {
        dispatch(addLeadingZero(sequence));
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