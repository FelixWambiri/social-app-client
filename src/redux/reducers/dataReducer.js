import * as types from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case types.SET_SCREAMS:
      return {
        ...state,
        screams: action.screams,
        loading: false
      };
    case types.SET_SCREAM:
      return {
        ...state,
        scream: action.scream
      };
    case types.LIKE_SCREAM:
    case types.UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.scream.screamId
      );
      state.screams[index] = action.scream;
      if (state.scream.screamId === action.scream.screamId) {
        state.scream = action.scream;
      }
      return {
        ...state
      };
    case types.SUBMIT_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.comment, ...state.scream.comments]
        }
      }
    case types.DELETE_SCREAM:
      let deleteIndex = state.screams.findIndex(
        scream => scream.screamId === action.screamId
      );
      state.screams.splice(deleteIndex, 1);
      return {
        ...state
      };
    case types.POST_SCREAM:
      return {
        ...state,
        screams: [action.scream, ...state.screams]
      };
    default:
      return state;
  }
}
