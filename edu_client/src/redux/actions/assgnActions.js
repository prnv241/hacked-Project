import * as ActionTypes from '../types';
import axios from 'axios';

export const getAssgnInfo = () => (dispatch) => {
  dispatch({ type: ActionTypes.ASSIGNMENTS_LOADING });
  axios.get('/assignments')
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_ASSIGNMENTS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const getAssgn = (assgnId) => (dispatch) => {
  dispatch({ type: ActionTypes.ASSGN_LOADING });
  axios.get(`/assignments/${assgnId}`)
    .then(res => {
      dispatch({
        type: ActionTypes.GET_ASSGN,
        payload: res.data
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const getSub = (asgnId, subId) => (dispatch) => {
  dispatch({ type: ActionTypes.SUB_LOADING });
  axios.get(`/written/${asgnId}/${subId}`)
    .then(res => {
      dispatch({
        type: ActionTypes.GET_SUB,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
    })
}

export const uploadSub = (formData) => (dispatch) => {
  dispatch({ type: ActionTypes.UPLOADING_SUB });
  axios.post(`/written/upload`, formData)
    .then((res) => {
      dispatch({ type: ActionTypes.SUB_UPLOADED, payload: res.data.fileUrl });
    })
    .catch(err => {
      console.log(err);
    });
}

export const submitSub = (form, asgnId, subId, history) => (dispatch) => {
  axios.post(`/written/${asgnId}/${subId}`, form)
    .then((res) => {
      dispatch({ type: ActionTypes.SUBMIT_SUB, payload: res.data });
      history.goBack();
    })
    .catch(err => {
      console.log(err);
    });
}


export const getQuizModule = (asgnId, ref) => (dispatch) => {
  dispatch({ type: ActionTypes.QUIZ_LOADING });
  axios.get(`/quiz/${asgnId}/${ref}`)
    .then((res) => {
      dispatch({
        type: ActionTypes.GET_QUIZ,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const subAsgnQuiz = (asgnId, ref, quizAns, data) => (dispatch) => {
  dispatch({ type: ActionTypes.ASGNRES_LOADING });
  axios.post(`/quiz/${asgnId}/${ref}`, { quizAns: quizAns, data: data })
    .then(res => {
      dispatch({
        type: ActionTypes.ASGNRES_LOADED
      })
    })
    .catch(err => {
      console.log(err);
    })
}

export const addSub = (data, asgnId, history) => (dispatch) => {
  axios.post(`/assignment/new/${asgnId}`, { asgndata: data })
    .then(res => {
      dispatch({
        type: ActionTypes.CREATE_SUB,
        payload: res.data
      })
      history.goBack();
    })
    .catch((err) => {
      console.log(err);
    })
}