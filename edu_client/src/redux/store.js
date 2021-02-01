import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import lessonReducer from "./reducers/lessonReducer";
import assignmentReducer from './reducers/assignmentReducer';
import liveReducer from './reducers/liveReducer';
import userReducer from './reducers/userReducer';

const initalstate = {};

const middleware = [thunk];

const reducers = combineReducers({
  lessons: lessonReducer,
  assignments: assignmentReducer,
  liveStreams: liveReducer,
  user: userReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initalstate,
  composeEnhancers(applyMiddleware(...middleware)),
);

export default store;