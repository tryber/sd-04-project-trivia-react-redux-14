import { combineReducers } from 'redux';
import { tokenReducer, questionsReducer } from './triviaReducers';

const rootReducer = combineReducers({
  tokenReducer,
  questionsReducer,
});

export default rootReducer;
