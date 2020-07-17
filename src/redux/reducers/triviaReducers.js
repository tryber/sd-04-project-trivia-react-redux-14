import { FETCH_DATA, RECEIVE_SUCCESS_TOKEN, FETCH_DATA_ERROR, RECEIVE_SUCCESS_QUESTION, SEND_USER_DATA, SEND_URL_GRAVATAR } from '../actions';

const initialState = {
  isFetching: false,
  error: '',
  token: '',
  questions: [],
  player: {},
  picture: '',
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, isFetching: action.isFetching };

    case RECEIVE_SUCCESS_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case FETCH_DATA_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return { ...state, isFetching: action.isFetching };

    case RECEIVE_SUCCESS_QUESTION:
      return {
        ...state,
        questions: action.questions,
      };

    case FETCH_DATA_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

export const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_USER_DATA:
      return {
        ...state,
        player: {
          ...state.player,
          ...action.userData,
        },
      };
    case SEND_URL_GRAVATAR:
      return {
        ...state,
        picture: action.url,
      };
    default:
      return state;
  }
};
