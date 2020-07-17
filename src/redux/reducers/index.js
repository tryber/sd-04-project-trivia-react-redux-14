import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import questionsReducer from './questionsReducer';
import userDataReducer from './userDataReducer';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
  userDataReducer,
});

export default rootReducer;
