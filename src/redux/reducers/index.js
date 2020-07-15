import { combineReducers } from 'redux';
import { tokenReducer } from './triviaReducers';

const rootReducer = combineReducers({
  tokenReducer,
});

export default rootReducer;
