import { SEND_USER_DATA, SEND_URL_GRAVATAR } from '../actions';

const initialState = {
  player: {},
  picture: '',
};

const userDataReducer = (state = initialState, action) => {
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

export default userDataReducer;
