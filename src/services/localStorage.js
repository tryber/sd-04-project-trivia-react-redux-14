export const saveToLocalStorage = (key, entry) => {
  let formattedEntry = entry;

  if (typeof entry === 'object') {
    formattedEntry = JSON.stringify(entry);
  }

  localStorage.setItem(key, formattedEntry);
};

export const loadFromLocalStorage = (key) => {
  if (key === 'ranking') return JSON.parse(localStorage.getItem(key));

  return localStorage.getItem(key);
};

export const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};

// state: {
//   player: {
//     name,
//     assertions,
//     score,
//     gravatarEmail,
//   }
// }

// ranking:
// [
//   {name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar}
// ]

// token:
