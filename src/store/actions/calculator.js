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
    console.log('CALL SET SEQUENCE', sequenceId, sequenceName, leadingZeroes)
    return dispatch => {
        dispatch(setSeq(sequenceId, sequenceName, leadingZeroes));
    };
};