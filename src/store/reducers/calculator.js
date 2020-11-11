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
    }    
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
        leadingZeroes: action.leadingZeroes
    }
    if (sequenceId === 'g') {
        return updateObject(state, { gSequence: newSequence });
    }
    return updateObject(state, { fSequence: newSequence });
}


// const addIngredient = (state, action) => {
//     const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
//     const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
//     const updatedState = {
//         ingredients: updatedIngredients,
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
//         building: true
//     }
//     return updateObject(state, updatedState)
// }

const addZero = (state, action) => {
    console.log('ACTION')
    console.log(action)
    let sequence = action.sequence;
    console.log('ACTION SEQUENCE')
    console.log(action.sequence)
    const updatedZeroes = {[action.sequence.leadingZeroes]: action.sequence.leadingZeroes + 1}
    if (action.sequenceId === 'g') {
        return updateObject(state, { ...state.gSequence, leadingZeroes: state.gSequence.leadingZeroes + 1 });
    }
    return updateObject(state, { ...state.fSequence, leadingZeroes: state.fSequence.leadingZeroes + 1 });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_SEQUENCE: return setSequence(state, action);
        case actionTypes.ADD_ZERO: return addZero(state, action);
        default: return state;
    }
};

export default reducer;