import md5 from 'crypto-js/md5';

const URL = 'https://opentdb.com/';
const ENDPOINT_TOKEN = 'api_token.php?command=request';
const GRAVATAR = 'https://www.gravatar.com/avatar/';

export const getToken = () => {
  const TOKEN = fetch(`${URL}${ENDPOINT_TOKEN}`)
    .then((resp) =>
    resp.json()
    .then((json) => (resp.ok ? Promise.resolve(json) : Promise.reject(json))));
  return TOKEN;
};

export const getGravatar = (email) => {
  const hashEmail = md5(email.trim().replace(' ', '').toLowerCase()).toString();
  const gravatar = `${GRAVATAR}${hashEmail}`;
  
  return gravatar;
};


// Paga pegar as perguntas, você deve realizar um GET request para o seguinte endpoint:

// https://opentdb.com/api.php?amount=${quantidade-de-perguntas-retornadas}&token=${seu-token-aqui}

// Recomendação: https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}
