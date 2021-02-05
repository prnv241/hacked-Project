import * as ActionTypes from '../types';
import axios from 'axios';

export const loginUser = (email, password, history) => (dispatch) => {
  dispatch({ type: ActionTypes.LOGIN_LOADING });
  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDusgMTr2Vy_XnlgIHBJZvdSMdExARv-E', {
    email: email,
    password: password,
    returnSecureToken: true
  })
    .then((res) => {
      const token = `Bearer ${res.data.idToken}`;
      axios.defaults.headers.common['Authorization'] = token;
      localStorage.setItem("token", token);
      console.log(axios.defaults.headers.common['Authorization']);
      axios.post('http://localhost:5001/interndemo-25232/us-central1/api/login', {
        localId: res.data.localId
      }).then(resdata => {
        dispatch({
          type: ActionTypes.LOGIN_USER,
          payload: resdata.data
        });
        console.log(resdata.data);
        history.push('/lessons');
      }).catch(err => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const signUser = (email, password, name, role, history) => (dispatch) => {
  dispatch({ type: ActionTypes.SIGNUP_LOADING });
  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDusgMTr2Vy_XnlgIHBJZvdSMdExARv-E', {
    email: email,
    password: password,
    returnSecureToken: true
  })
    .then((res) => {
      const token = "Bearer " + res.data.idToken;
      axios.defaults.headers.common['Authorization'] = token;
      localStorage.setItem("token", token);
      console.log("ERE");
      axios.post('http://localhost:5001/interndemo-25232/us-central1/api/ssignup', {
        id: res.data.localId,
        name: name,
        role: role,
        email: email
      }).then(resdata => {
        dispatch({
          type: ActionTypes.SIGNUP_USER,
          payload: resdata.data
        });
        console.log(resdata.data);
        history.push('/lessons');
      }).catch(err => {
        console.log(err);
      })
    })
    .catch((err) => {
      console.log(err);
    })
}

export const logoutUser = (history) => (dispatch) => {
  axios.defaults.headers.common['Authorization'] = "";
  localStorage.removeItem("token");
  dispatch({ type: ActionTypes.LOGOUT_USER });
  history.push('/login');
}