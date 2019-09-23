import * as types from "../types";

const initialState = {
  loading: false,
  errors: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.errors
      };
    case types.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null
      };
    case types.LOADING_UI:
      return {
        ...state,
        loading: true
      };
    case types.STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
