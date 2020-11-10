import * as actionTypes from '../actions/calcActionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    fSequence: {
        sequenceName: 'catalan',
        sequenceIsFreeform: false,
        leadingZeroes: 0
    },
    gSequence: {
        sequenceName: 'catalan',
        sequenceIsFreeform: false,
        leadingZeroes: 1
    }
};

// const purchaseBurgerSuccess = (state, action) => {
//     const newOrder = {
//         ...action.orderData,
//         id: action.orderId
//     };
//     return updateObject(state, { 
//         loading: false,
//         purchased: true,
//         orders: state.orders.concat(newOrder)
//     });
// }

const setSequence = (state, action) => {
    const sequenceId = action.sequenceId;
    let sequenceIsFreeform = false;
    if (action.sequenceName === 'freeform') {
        sequenceIsFreeform = true;
    }
    const newSequence = {
        sequenceName: action.sequenceName,
        sequenceIsFreeform: sequenceIsFreeform,
        leadingZeroes: action.leadingZeroes
    }
    if (sequenceId === 'g') {
        return updateObject(state, { gSequence: newSequence });
    }
    return updateObject(state, { fSequence: newSequence });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEQUENCE: return setSequence(state, action);
        default: return state;
    }
};

export default reducer;