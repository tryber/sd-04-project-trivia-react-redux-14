import { REQUEST_TOKEN, RECEIVE_SUCCESS_TOKEN, RECEIVE_ERROR_TOKEN } from '../actions'

const initialState = {
  token: '',
  isFetching: false,
  error: '',
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_TOKEN:
      return { ...state, action };

    case RECEIVE_SUCCESS_TOKEN:
      return { ...state, action };

    case RECEIVE_ERROR_TOKEN:
      return { ...state, action };

    default:
      return state;
  }
};
