import { getToken } from '../../services/api';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const RECEIVE_SUCCESS_TOKEN = 'RECEIVE_SUCCESS_TOKEN';
export const RECEIVE_ERROR_TOKEN = 'RECEIVE_ERROR_TOKEN';

const requestToken = bool => ({
  type: REQUEST_TOKEN,
  isFetching: bool,
});

const receiveSuccessToken = apiResponse => ({
  type: RECEIVE_SUCCESS_TOKEN,
  token: apiResponse.token,
});

const requestErrorToken = error => ({
  type: RECEIVE_ERROR_TOKEN,
  error,
});

export const fetchToken = () => {
  return dispatch => {
    dispatch(requestToken(true));

    return (
      getToken().then(data => {
        if (data.response_code === 0) {
          dispatch(requestToken(false));
          dispatch(receiveSuccessToken(data));
        } else {
          dispatch(requestErrorToken('Algo deu errado! Token inválido'));
        }
      }),
      error => dispatch(requestErrorToken(error.message))
    );
  };
};
