import * as ActionTypes from '../types';

const initialState = {
  assignments: [],
  assignment: {},
  submission: {},
  loading: {
    aloading: true,
    ploading: true,
    dloading: true,
    gloading: true,
  },
  upload: false,
  uploading: null,
  url: null,
  quiz: {},
  rloading: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: action.payload,
        loading: {
          ...state.loading,
          aloading: false
        }
      }
    case ActionTypes.GET_ASSGN:
      return {
        ...state,
        assignment: action.payload,
        loading: {
          ...state.loading,
          ploading: false
        }
      }
    case ActionTypes.ASSIGNMENTS_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          aloading: true
        }
      }
    case ActionTypes.ASSGN_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ploading: true
        }
      }

    case ActionTypes.SUB_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          dloading: true
        }
      }

    case ActionTypes.GET_SUB:
      return {
        ...state,
        submission: action.payload,
        loading: {
          ...state.loading,
          dloading: false
        }
      }
    case ActionTypes.SUB_LOADING:
      return {
        ...state,
        uploading: true,
      }

    case ActionTypes.SUB_UPLOADED:
      return {
        ...state,
        upload: true,
        url: action.payload
      }

    case ActionTypes.SUBMIT_SUB:
      return {
        ...state,
        assignment: {
          ...state.assignment,
          submissions: action.payload
        }
      }

    case ActionTypes.QUIZ_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          gloading: true
        }
      }

    case ActionTypes.GET_QUIZ:
      return {
        ...state,
        quiz: action.payload,
        loading: {
          ...state.loading,
          gloading: false
        }
      }

    case ActionTypes.ASGNRES_LOADING:
      return {
        ...state,
        rloading: true
      }
    case ActionTypes.ASGNRES_LOADED:
      return {
        ...state,
        rloading: false
      }

    case ActionTypes.CREATE_SUB:
      return {
        ...state,
        assignment: {
          ...state.assignment,
          submissions: action.payload
        }
      }

    default:
      return state;
  }
}