import * as types from "../types";
import axios from "axios";

// actions
export const loadUI = () => ({ type: types.LOADING_UI });
const setUser = user => ({ type: types.SET_USER, user });
export const clearErrors = () => ({ type: types.CLEAR_ERRORS });
export const setErrors = errors => ({ type: types.SET_ERRORS, errors });
const setUnAuthenticated = () => ({ type: types.SET_UNAUTHENTICATED });
export const setAuthenticated = () => ({ type: types.SET_AUTHENTICATED });
const loadingUser = () => ({ type: types.LOADING_USER });
const markAllNotificationsRead = () => ({
  type: types.MARK_NOTIFICATIONS_READ
});

// add token to axios header for authorization
const setAuthorizationHeader = token => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);

  // add authorization token to axios
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

// action creators
export const loginUser = (user, history) => dispatch => {
  dispatch(loadUI());
  return axios
    .post("/login", user)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUser());
      dispatch(clearErrors());
      history.push("/");
    })
    .catch(function(error) {
      if (error.response) {
        console.log(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("The default error message", error.message);
      }
    });
  // .catch(err => {
  //   console.log("The login request error is", err.request);
  //   console.log("The login response error is", err.response);
  //   dispatch(setErrors(err.response.data));
  // });
};

export const getUser = () => dispatch => {
  dispatch(loadingUser());
  return axios
    .get("/user")
    .then(res => {
      dispatch(setUser(res.data));
    })
    .catch(err => console.log(err));
};

export const signupUser = (newUser, history) => dispatch => {
  dispatch(loadUI());
  return axios
    .post("/signup", newUser)
    .then(res => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUser());
      dispatch(clearErrors());
      history.push("/");
    })
    .catch(err => {
      console.log("The error from signup is", err.res);
      dispatch(setErrors(err.response.data));
    });
};

export const logout = () => dispatch => {
  localStorage.removeItem("FBIdToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setUnAuthenticated());
};

export const uploadImage = formData => dispatch => {
  dispatch(loadingUser);
  return axios
    .post("/user/image", formData)
    .then(() => {
      dispatch(getUser());
    })
    .catch(err => {
      console.log(err);
    });
};

export const editUserDetails = userDetails => dispatch => {
  dispatch(loadingUser());
  return axios
    .post("/user", userDetails)
    .then(() => {
      dispatch(getUser());
    })
    .catch(err => {
      console.log(err);
    });
};

export const markNotificationsAsRead = notificationIds => dispatch => {
  return axios
    .post("/notifications", notificationIds)
    .then(res => {
      dispatch(markAllNotificationsRead());
    })
    .catch(err => console.log(err));
};
