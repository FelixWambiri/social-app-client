import axios from "axios";
import * as types from "../types";

import { setErrors, clearErrors, loadUI } from "./userActions";

// actions
const loadingData = () => ({ type: types.LOADING_DATA });
const setScreams = screams => ({ type: types.SET_SCREAMS, screams });
const setScream = scream => ({ type: types.SET_SCREAM, scream });
const likeOneScream = scream => ({ type: types.LIKE_SCREAM, scream });
const unlikeOneScream = scream => ({ type: types.UNLIKE_SCREAM, scream });
const deleteOneScream = screamId => ({ type: types.DELETE_SCREAM, screamId });
const postOneScream = scream => ({ type: types.POST_SCREAM, scream });
const stopLoadingUI = () => ({ type: types.STOP_LOADING_UI });
const subOneComment = comment => ({ type: types.SUBMIT_COMMENT, comment });

export const getScreams = () => dispatch => {
  dispatch(loadingData());
  return axios
    .get("/screams")
    .then(res => {
      dispatch(setScreams(res.data));
    })
    .catch(err => {
      dispatch({ type: types.SET_SCREAMS, payload: [] });
    });
};

export const getScream = screamId => dispatch => {
  dispatch(loadUI());
  return axios
    .get(`/scream/${screamId}`)
    .then(res => {
      dispatch(setScream(res.data));
      dispatch(stopLoadingUI());
    })
    .catch(err => {
      console.log(err.response);
      dispatch(stopLoadingUI());
    });
};

export const postScream = newScream => dispatch => {
  dispatch(loadUI());
  return axios
    .post("/scream", newScream)
    .then(res => {
      dispatch(postOneScream(res.data));
      dispatch(clearErrors());
    })
    .catch(err => {
      console.log(err);
      dispatch(setErrors(err.response.data));
    });
};

export const likeScream = screamId => dispatch => {
  return axios
    .get(`/scream/${screamId}/like`)
    .then(res => {
      dispatch(likeOneScream(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const unlikeScream = screamId => dispatch => {
  return axios
    .get(`/scream/${screamId}/unlike`)
    .then(res => {
      dispatch(unlikeOneScream(res.data));
    })
    .catch(err => {
      console.log(err);
    });
};

export const submitComment = (screamId, comment) => dispatch => {
  return axios
    .post(`/scream/${screamId}/comment`, comment)
    .then(res => {
      dispatch(subOneComment(res.data));
      dispatch(clearErrors());
    })
    .catch(err => {
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", err.response.data);
      dispatch(setErrors(err.response.data));
    });
};
export const deleteScream = screamId => dispatch => {
  return axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch(deleteOneScream(screamId));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getUserData = userHandle => dispatch => {
  dispatch(loadingData());
  return axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch(setScreams(res.data.screams));
    })
    .catch(() => {
      dispatch(setScreams(null));
    });
};

