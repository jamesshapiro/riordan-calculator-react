import * as actionTypes from './calcActionTypes';
import axios from 'axios';

export const selectSeq = (sequenceId, sequenceName) => {
    return {
        type: actionTypes.SELECT_SEQUENCE,
        sequenceId: sequenceId,
        sequenceName: sequenceName
    };
}

export const selectSequence = (sequenceId, sequenceName) => {
    return dispatch => {
        dispatch(selectSeq(sequenceId, sequenceName));
    };
};

export const setCustomSeq = (sequenceId, sequence) => {
    return {
        type: actionTypes.SET_CUSTOM_SEQUENCE,
        sequenceId: sequenceId,
        sequence: sequence
    };
}

export const setCustomSequence = (sequenceId, sequence) => {
    return dispatch => {
        dispatch(setCustomSeq(sequenceId, sequence));
    };
};

export const addLeadingZero = (sequenceId) => {
    return {
        type: actionTypes.ADD_ZERO,
        sequenceId: sequenceId
    };
}

export const addZero = (sequenceId) => {
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

export const fetchMatrixStart = () => {
    return {
        type: actionTypes.FETCH_MATRIX_START
    };
};


export const fetchMatrixSuccess = (res) => {
    return {
        type: actionTypes.FETCH_MATRIX_SUCCESS,
        res: res
    }
}

export const fetchMatrixFail = (error) => {
    return {
        type: actionTypes.FETCH_MATRIX_FAIL,
        error: error
    };
};



export const fetchMatrix = () => {
    return (dispatch, getState) => {
        dispatch(fetchMatrixStart())
        const url = 'https://dph1lrra6i.execute-api.us-east-1.amazonaws.com/dev/compute-matrix'
        console.log(getState());
        const state = getState();
        const numCellsToDisplay = state.calc.numCellsToDisplay;
        const gSeq = Array(state.calc.gSequence.leadingZeroes).fill(0).concat(state.calc.gSequence.sequence).slice(0, numCellsToDisplay).join();
        const fSeq = Array(state.calc.fSequence.leadingZeroes).fill(0).concat(state.calc.fSequence.sequence).slice(0, numCellsToDisplay).join();
        console.log(gSeq);
        console.log(fSeq);
        const payload = {
            "g": gSeq,
            "f": fSeq
        }
        axios.put(url, payload)
            .then(res => {
                const json_body = JSON.parse(res.data.body)
                console.log(json_body)
                dispatch(fetchMatrixSuccess(json_body));
            })
            .catch(err => {
                dispatch(fetchMatrixFail(err))
            });
    }
}


// export const fetchMatrix = () => {
//     return dispatch => {
//         dispatch(fetchMatrixStart())
//         dispatch(fetchMat());
//     };
// };