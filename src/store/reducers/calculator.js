import * as actionTypes from "../actions/calcActionTypes";
import { updateObject } from "../../shared/utility";
import { sequenceMap } from "../../data/sequenceData";
import { expSequenceMap } from "../../data/expSequenceData";

const isExponential = () => {
  return (
    window.location.toString().toLowerCase().includes('exponential') ||
    window.location.toString().toLowerCase().includes('localhost:3000')
  )
}

const getSequenceMap = () => {
  if (isExponential()) {
    return expSequenceMap
  } else {
    return sequenceMap
  }
}

const getDefaultSequence = () => {
  if (isExponential()) {
    return 'nonempty block'
  } else {
    return 'catalan'
  }
}

var initialState = {
  gSequence: {
    sequenceId: 'g',
    sequenceName: getDefaultSequence(),
    sequenceIsFreeform: false,
    sequence: getSequenceMap()[getDefaultSequence()],
  },
  fSequence: {
    sequenceId: 'f',
    sequenceName: getDefaultSequence(),
    sequenceIsFreeform: false,
    sequence: [0].concat(getSequenceMap()[getDefaultSequence()]),
  },
  numCellsToDisplay: 11,
  maxDisplayableCells: Math.min(
    0 + getSequenceMap()[getDefaultSequence()].length,
    1 + getSequenceMap()[getDefaultSequence()].length
  ),
  loadingMatrix: false,
  loadingExpMatrix: false,
  a_sequence: null,
  b_sequence: null,
  riordan_group_elem: null,
  exponential: null,
  riordan_is_pseudo: true,
  stieltjes: null,
  exponentialstieltjes: null,
  tweedle_left: null,
  tweedle_left_a_sequence: null,
  tweedle_left_b_sequence: null,
  tweedle_left_is_pseudo: true,
  tweedle_left_z_sequence: null,
  tweedle_right: null,
  tweedle_right_a_sequence: null,
  tweedle_right_b_sequence: null,
  tweedle_right_is_pseudo: true,
  tweedle_right_z_sequence: null,
  z_sequence: null,
  newSequenceLoading: false,
}

if (window.location.search) {
  const f_and_g = window.location.search.split('&')
  var gSequence = f_and_g[0].slice(3).split(',').map(Number)
  var fSequence = f_and_g[1].slice(2).split(',').map(Number)
  var minLength = Math.min(gSequence.length, fSequence.length)
  gSequence = gSequence.slice(0, minLength)
  fSequence = fSequence.slice(0, minLength)
  initialState['gSequence'] = {
    sequenceId: 'g',
    sequenceName: '',
    sequenceIsFreeform: true,
    sequence: gSequence,
  }
  initialState['fSequence'] = {
    sequenceId: 'f',
    sequenceName: '',
    sequenceIsFreeform: true,
    sequence: fSequence,
  }
  
}

const setCustomSequence = (state, action) => {
  const sequenceId = action.sequenceId;
  let numCellsToDisplay = Math.min(
    action.sequence.length,
    state.numCellsToDisplay
  );
  if (sequenceId === "g") {
    let newSequence = {
      ...state.gSequence,
      sequenceName: "custom",
      sequence: action.sequence,
    };
    if (action.isNewSequence) {
      numCellsToDisplay = Math.min(
        newSequence.sequence.length,
        state.fSequence.sequence.length
      );
    }
    return updateObject(state, {
      gSequence: newSequence,
      maxDisplayableCells: Math.min(
        newSequence.sequence.length,
        state.fSequence.sequence.length
      ),
      numCellsToDisplay: numCellsToDisplay,
    });
  } else {
    let newSequence = {
      ...state.fSequence,
      sequenceName: "custom",
      sequence: action.sequence,
    };
    if (action.isNewSequence) {
      numCellsToDisplay = Math.min(
        newSequence.sequence.length,
        state.gSequence.sequence.length
      );
    }
    return updateObject(state, {
      fSequence: newSequence,
      maxDisplayableCells: Math.min(
        newSequence.sequence.length,
        state.gSequence.sequence.length
      ),
      numCellsToDisplay: numCellsToDisplay,
    });
  }
};

const selectSequence = (state, action) => {
  const sequenceId = action.sequenceId;
  console.log('selecting sequence...')
  if (sequenceId === "g") {
    let newSequence = {
      ...state.gSequence,
      sequenceName: action.sequenceName,
      sequence: getSequenceMap()[action.sequenceName],
    }
    return updateObject(state, {
      gSequence: newSequence,
      maxDisplayableCells: Math.min(
        newSequence.sequence.length,
        state.fSequence.sequence.length
      ),
      numCellsToDisplay: Math.min(
        newSequence.sequence.length,
        state.numCellsToDisplay
      ),
    });
  } else {
    let newSequence = {
      ...state.fSequence,
      sequenceName: action.sequenceName,
      sequence: [0].concat(getSequenceMap()[action.sequenceName]),
    }
    return updateObject(state, {
      fSequence: newSequence,
      maxDisplayableCells: Math.min(
        newSequence.sequence.length,
        state.gSequence.sequence.length
      ),
      numCellsToDisplay: Math.min(
        newSequence.sequence.length,
        state.numCellsToDisplay
      ),
    });
  }
};

const displayFewerTerms = (state, action) => {
  const newNumCellsToDisplay = state.numCellsToDisplay - 1;
  return updateObject(state, { numCellsToDisplay: newNumCellsToDisplay });
};

const displayMoreTerms = (state, action) => {
  const newNumCellsToDisplay = state.numCellsToDisplay + 1;
  return updateObject(state, { numCellsToDisplay: newNumCellsToDisplay });
};

const fetchMatrixSuccess = (state, action) => {
  const json_body = action.json_body;
  console.log('==============================')
  console.log(json_body['exponentialstieltjes'])
  console.log('==============================')

  return updateObject(state, {
    loadingMatrix: false,
    loadingExpMatrix: false,
    a_sequence: json_body['a seq'],
    b_sequence: json_body['b seq'],
    riordan_group_elem: json_body['riordan group elem'],
    exponential: json_body['exponential'],
    riordan_is_pseudo: json_body['riordan pseudo'],
    stieltjes: json_body.stieltjes,
    exponentialstieltjes: json_body.exponentialstieltjes,
    tweedle_left: json_body['tweedle left'],
    tweedle_left_a_sequence: json_body['tweedle left a seq'],
    tweedle_left_b_sequence: json_body['tweedle left b seq'],
    tweedle_left_is_pseudo: json_body['tweedle left pseudo'],
    tweedle_left_z_sequence: json_body['tweedle left z seq'],
    tweedle_right: json_body['tweedle right'],
    tweedle_right_a_sequence: json_body['tweedle right a seq'],
    tweedle_right_b_sequence: json_body['tweedle right b seq'],
    tweedle_right_is_pseudo: json_body['tweedle right pseudo'],
    tweedle_right_z_sequence: json_body['tweedle right z seq'],
    z_sequence: json_body['z seq'],
  })
};

const fetchOEISSequenceSuccess = (state, action) => {
  const sequenceId = action.sequenceId;
  const sequence = action.sequence;
  if (sequenceId === "g") {
    let newSequence = {
      ...state.gSequence,
      sequenceName: "custom",
      sequence: sequence,
    };
    return updateObject(state, {
      gSequence: newSequence,
      maxDisplayableCells: Math.min(
        newSequence.sequence.length,
        state.fSequence.sequence.length
      ),
      numCellsToDisplay: Math.min(
        newSequence.sequence.length,
        state.numCellsToDisplay
      ),
      newSequenceLoading: false,
    });
  } else {
    let newSequence = {
      ...state.fSequence,
      sequenceName: "custom",
      sequence: [0].concat(sequence),
    };
    return updateObject(state, {
      fSequence: newSequence,
      maxDisplayableCells: Math.min(
        newSequence.sequence.length,
        state.gSequence.sequence.length
      ),
      numCellsToDisplay: Math.min(
        newSequence.sequence.length,
        state.numCellsToDisplay
      ),
      newSequenceLoading: false,
    });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_SEQUENCE:
      return selectSequence(state, action);
    case actionTypes.SET_CUSTOM_SEQUENCE:
      return setCustomSequence(state, action);
    case actionTypes.DISPLAY_FEWER_TERMS:
      return displayFewerTerms(state, action);
    case actionTypes.DISPLAY_MORE_TERMS:
      return displayMoreTerms(state, action);
    case actionTypes.FETCH_MATRIX_START:
      return updateObject(state, { loadingMatrix: true });
    case actionTypes.FETCH_MATRIX_SUCCESS:
      return fetchMatrixSuccess(state, action);
    case actionTypes.FETCH_MATRIX_FAIL:
      return updateObject(state, { loadingMatrix: false });
    case actionTypes.FETCH_OEIS_SEQUENCE_START:
      return updateObject(state, { newSequenceLoading: true });
    case actionTypes.FETCH_OEIS_SEQUENCE_SUCCESS:
      return fetchOEISSequenceSuccess(state, action);
    case actionTypes.FETCH_OEIS_SEQUENCE_FAIL:
      return updateObject(state, { newSequenceLoading: false });
    default:
      return state;
  }
};

export default reducer;
