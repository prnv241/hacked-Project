import * as ActionTypes from '../types';

const initialState = {
    loading: false,
    id: '',
    name: '',
    email: '',
    role: '',
    rollno: '',
    auth: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }

        case ActionTypes.LOGIN_USER:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
                rollno: action.payload.rollno,
                loading: false,
                auth: true
            }

        case ActionTypes.SIGNUP_LOADING:
            return {
                ...state,
                loading: true
            }

        case ActionTypes.SIGNUP_USER:
            return {
                ...state,
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                role: action.payload.role,
                rollno: action.payload.rollno,
                loading: false,
                auth: true
            }

        case ActionTypes.LOGOUT_USER:
            return {
                ...state,
                id: '',
                name: '',
                email: '',
                role: '',
                roleno: '',
                auth: false
            }
        default:
            return state;
    }
}