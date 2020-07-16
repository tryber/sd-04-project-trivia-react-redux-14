import { combineReducers } from 'redux';
import { tokenReducer, questionsReducer, userDataReducer } from './triviaReducers';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
  userDataReducer,
});

export default rootReducer;
