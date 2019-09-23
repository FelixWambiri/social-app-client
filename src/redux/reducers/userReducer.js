import * as types from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case types.SET_UNAUTHENTICATED:
      return initialState;
    case types.SET_USER:
      return {
        authenticated: true,
        ...action.user
      };
    case types.LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case types.LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.scream.screamId
          }
        ]
      };
    case types.UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          like => like.screamId !== action.scream.screamId
        )
      };
    case types.MARK_NOTIFICATIONS_READ:
      state.notifications.forEach(notification => (notification.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
