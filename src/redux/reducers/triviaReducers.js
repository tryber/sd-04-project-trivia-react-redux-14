import { FETCH_DATA, RECEIVE_SUCCESS_TOKEN, FETCH_DATA_ERROR, RECEIVE_SUCCESS_QUESTION } from '../actions';

const initialState = {
  isFetching: false,
  error: '',
  token: '',
  questions: [],
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, action };

    case RECEIVE_SUCCESS_TOKEN:
      return { ...state, action };

    case FETCH_DATA_ERROR:
      return { ...state, action };

    default:
      return state;
  }
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, action };

    case RECEIVE_SUCCESS_QUESTION:
      return { ...state, action };

    case FETCH_DATA_ERROR:
      return { ...state, action };

    default:
      return state;
  }
};
