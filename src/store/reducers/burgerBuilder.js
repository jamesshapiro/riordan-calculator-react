import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    beef: 1.3,
    bacon: 0.7
}

const changeIngredient = (state, action, add) => {
    let multiplier = 1
    if (!add) {
        multiplier = -1
    }
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + (multiplier * 1) }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + (multiplier * INGREDIENT_PRICES[action.ingredientName]),
        building: true
    }
    return updateObject(state, updatedState)
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: {
            lettuce: action.ingredients.lettuce,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            beef: action.ingredients.beef
        },
        totalPrice: 4,
        error: false,
        building: false
    });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return changeIngredient(state, action, true);
        case actionTypes.REMOVE_INGREDIENT: return changeIngredient(state, action, false);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return updateObject(state, { error: true });
        default: return state;
    }
};

export default reducer;

