import store from '../store';
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
    qloading: true,
    sloading: true,
    jloading: true,
  },
  quizsubs: {},
  subsubs: {},
  upload: false,
  uploading: null,
  url: null,
  quiz: {},
  studs: [],
  rloading: null,
  lloading: true,
  lives: []
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

    case ActionTypes.QUIZSUB_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          qloading: true
        }
      }

    case ActionTypes.SUBSUB_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          sloading: true
        }
      }

    case ActionTypes.QUIZSUB_LOADED:
      return {
        ...state,
        quizsubs: action.payload,
        loading: {
          ...state.loading,
          qloading: false
        },
      }

    case ActionTypes.SUBSUB_LOADED:
      return {
        ...state,
        subsubs: action.payload,
        loading: {
          ...state.loading,
          sloading: false
        },
      }

    case ActionTypes.UPDATE_MARKS:
      var newSub = state.subsubs;
      newSub[action.payload.ind].marks = action.payload.marks;
      return {
        ...state,
        subsubs: newSub
      }

    case ActionTypes.STUDS_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          jloading: true
        }
      }

    case ActionTypes.STUDS_LOADED:
      return {
        ...state,
        studs: action.payload,
        loading: {
          ...state.loading,
          jloading: false
        }
      }

    case ActionTypes.LIVE_LOADING:
      return {
        ...state,
        lloading: true,
      }

    case ActionTypes.GET_LIVE:
      return {
        ...state,
        lives: action.payload,
        lloading: false,
      }

    case ActionTypes.CREATE_LIVE:
      return {
        ...state,
        lives: action.payload,
      }

    default:
      return state;
  }
}