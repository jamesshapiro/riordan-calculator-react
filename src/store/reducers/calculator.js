import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import reducer from './burgerBuilder';

const initialState = {
    fSequence: 'catalan',
    gSequence: 'catalan',
    fSequenceIsFreeform: false,
    gSequenceIsFreeform: false,
    fSequenceLeadingZeros: 0,
    gSequenceLeadingZeros: 1
};

const setSequence = (state, action) => {
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



export default reducer;