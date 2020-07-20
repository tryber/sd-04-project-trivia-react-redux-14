export const SEND_USER_DATA = 'SEND_USER_DATA';
export const SEND_URL_GRAVATAR = 'SEND_URL_GRAVATAR';

export const sendUserData = (userData) => ({
  type: SEND_USER_DATA,
  userData,
});

export const sendUrlGravatar = (url) => ({
  type: SEND_URL_GRAVATAR,
  url,
});
