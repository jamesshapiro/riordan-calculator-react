import * as actionTypes from "./calcActionTypes";
import axios from "axios";

export const selectSeq = (sequenceId, sequenceName) => {
  return {
    type: actionTypes.SELECT_SEQUENCE,
    sequenceId: sequenceId,
    sequenceName: sequenceName,
  };
};

export const selectSequence = (sequenceId, sequenceName) => {
  return (dispatch) => {
    dispatch(selectSeq(sequenceId, sequenceName));
  };
};

export const setCustomSeq = (sequenceId, sequence, isNewSequence) => {
  return {
    type: actionTypes.SET_CUSTOM_SEQUENCE,
    sequenceId: sequenceId,
    sequence: sequence,
    isNewSequence: isNewSequence,
  };
};

export const setCustomSequence = (sequenceId, sequence, isNewSequence) => {
  return (dispatch) => {
    dispatch(setCustomSeq(sequenceId, sequence, isNewSequence));
  };
};

export const addLeadingZero = (sequenceId) => {
  return {
    type: actionTypes.ADD_ZERO,
    sequenceId: sequenceId,
  };
};

export const addZero = (sequenceId) => {
  return (dispatch) => {
    dispatch(addLeadingZero(sequenceId));
  };
};

export const displayOneFewerTerms = () => {
  return {
    type: actionTypes.DISPLAY_FEWER_TERMS,
  };
};

export const displayFewerTerms = () => {
  return (dispatch) => {
    dispatch(displayOneFewerTerms());
  };
};

export const displayOneMoreTerms = () => {
  return {
    type: actionTypes.DISPLAY_MORE_TERMS,
  };
};

export const displayMoreTerms = () => {
  return (dispatch) => {
    dispatch(displayOneMoreTerms());
  };
};

export const fetchMatrixStart = () => {
  return {
    type: actionTypes.FETCH_MATRIX_START,
  };
};

export const fetchMatrixSuccess = (json_body) => {
  return {
    type: actionTypes.FETCH_MATRIX_SUCCESS,
    json_body: json_body,
  };
};

export const fetchMatrixFail = (error) => {
  return {
    type: actionTypes.FETCH_MATRIX_FAIL,
    error: error,
  };
};

export const fetchMatrix = (mode) => {
  return (dispatch, getState) => {
    dispatch(fetchMatrixStart());
    const url = process.env.REACT_APP_URL
    // const url =
    //   "https://dph1lrra6i.execute-api.us-east-1.amazonaws.com/dev/compute-matrix";
    const state = getState();
    const numCellsToDisplay = state.calc.numCellsToDisplay;
    let gSeq = state.calc.gSequence.sequence.slice(0, numCellsToDisplay).join();
    let fSeq = state.calc.fSequence.sequence.slice(0, numCellsToDisplay).join();
    if (mode === "Bell Subgroup") {
      fSeq = [0]
        .concat(state.calc.gSequence.sequence.slice(0, numCellsToDisplay))
        .join();
    } else if (mode === "Derivative Subgroup") {
      const derivative = state.calc.fSequence.sequence
        .slice(1)
        .map((element, index) => {
          return element * (index + 1);
        });
      gSeq = derivative.join();
    } else if (mode === "Appell Subgroup") {
      const newFSequence = Array(state.calc.gSequence.sequence.length).fill(0);
      newFSequence[1] = 1;
      fSeq = newFSequence.join();
    } else if (mode === "Associated (Lagrange) Subgroup") {
      const newGSequence = Array(state.calc.fSequence.sequence.length).fill(0);
      newGSequence[0] = 1;
      gSeq = newGSequence.join();
    } else if (mode === "2-Bell Subgroup") {
      let gSquared = Array(state.calc.gSequence.sequence.length).fill(0);
      let i = 0;
      for (i = 0; i < gSquared.length; i++) {
        const array_1 = state.calc.gSequence.sequence.slice(0, i + 1);
        const array_2 = state.calc.gSequence.sequence.slice(0, i + 1).reverse();
        const unreducedProduct = array_1.map((elem, idx) => {
          return elem * array_2[idx];
        });
        gSquared[i] = unreducedProduct.reduce(function (a, b) {
          return a + b;
        }, 0);
        const newFSequence = [0].concat(gSquared);
        fSeq = newFSequence.join();
      }
    }
    const payload = {
      g: gSeq,
      f: fSeq,
    };
    axios
      .put(url, payload)
      .then((res) => {
        const json_body = JSON.parse(res.data);
        console.log(json_body)
        dispatch(fetchMatrixSuccess(json_body));
      })
      .catch((err) => {
        dispatch(fetchMatrixFail(err));
      });
  };
};

export const fetchOEISSequenceStart = () => {
  return {
    type: actionTypes.FETCH_OEIS_SEQUENCE_START,
  };
};

export const fetchOEISSequenceSuccess = (sequenceId, sequence) => {
  return {
    type: actionTypes.FETCH_OEIS_SEQUENCE_SUCCESS,
    sequenceId: sequenceId,
    sequence: sequence,
  };
};

export const fetchOEISSequenceFail = (error) => {
  return {
    type: actionTypes.FETCH_OEIS_SEQUENCE_FAIL,
    error: error,
  };
};

export const fetchOEISSequence = (sequenceId, oeisSequenceId) => {
  return (dispatch, getState) => {
    dispatch(fetchOEISSequenceStart());
    const url =
      "https://fh3cm0x1k4.execute-api.us-east-1.amazonaws.com/prod/getsequence";
    const state = getState();
    const queryParams = "?sequence=" + oeisSequenceId;
    axios
      .get(url + queryParams)
      .then((res) => {
        const oeisSequence = res.data.oeis_sequence;
        dispatch(fetchOEISSequenceSuccess(sequenceId, oeisSequence));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchOEISSequenceFail(err));
      });
  };
};
