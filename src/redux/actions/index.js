import { getToken, getQuestions } from '../../services/api';

export const FETCH_DATA_TOKEN = 'FETCH_DATA_TOKEN';
export const FETCH_DATA_QUESTION = 'FETCH_DATA_QUESTION';
export const FETCH_DATA_ERROR = 'FETCH_DATA_ERROR';
export const RECEIVE_SUCCESS_TOKEN = 'RECEIVE_SUCCESS_TOKEN';
export const RECEIVE_SUCCESS_QUESTION = 'RECEIVE_SUCCESS_QUESTION';
export const SEND_USER_DATA = 'SEND_USER_DATA';
export const SEND_URL_GRAVATAR = 'SEND_URL_GRAVATAR';

const fetchingDataToken = (bool) => ({
  type: FETCH_DATA_TOKEN,
  isFetching: bool,
});

const fetchingDataQuestion = (bool) => ({
  type: FETCH_DATA_QUESTION,
  isFetching: bool,
});

const fetchingDataError = (error) => ({
  type: FETCH_DATA_ERROR,
  error,
});

const receiveSuccessToken = (apiResponse) => ({
  type: RECEIVE_SUCCESS_TOKEN,
  token: apiResponse.token,
});

export const fetchToken = () => (dispatch) => {
  dispatch(fetchingDataToken(true));

  return (
    getToken().then((data) => {
      if (data.response_code === 0) {
        dispatch(receiveSuccessToken(data));
        dispatch(fetchingDataToken(false));
      } else {
        dispatch(fetchingDataError('Algo deu errado! Token inválido'));
      }
    }),
    (error) => dispatch(fetchingDataError(error.message))
  );
};

const receiveSuccessQuestion = (apiResponse) => ({
  type: RECEIVE_SUCCESS_QUESTION,
  questions: apiResponse.results,
});

export const fetchQuestions = () => (dispatch) => {
  dispatch(fetchingDataQuestion(true));

  return (
    getQuestions().then((data) => {
      if (data.response_code === 0) {
        dispatch(receiveSuccessQuestion(data));
        dispatch(fetchingDataQuestion(false));
      } else {
        dispatch(fetchingDataError('Algo deu errado! Quest não existe'));
      }
    }),
    (error) => dispatch(fetchingDataError(error.message))
  );
};

export const sendUserData = (userData) => ({
  type: SEND_USER_DATA,
  userData,
});

export const sendUrlGravatar = (url) => ({
  type: SEND_URL_GRAVATAR,
  url,
});
