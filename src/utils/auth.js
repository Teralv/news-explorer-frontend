function checkRespose(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

export const BASE_URL = 'https://api.news-explorer.ignorelist.com';

/*export const BASE_URL = process.env.NODE_ENV === "production" ? "https://api.news-explorer.ignorelist.com" : "http://localhost:3000";*/

/*export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then(checkRespose)
  .then((data) => {
    if (data.error) {
      throw new Error(data.error)
    }
    console.log(data);
  });
};*/

export const register = ( email, password, name ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password, name })
  })
  .then((response) => {
    if (response.status === 201){
      return response.json();
    }
  })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));
};


export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(checkRespose)
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    } else {
      return;
    }
  });
};

/*export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch((err) => console.log(err));
};*/

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  })
  .then(checkRespose)
  .then((data) => {
    if (data.error) {
      throw new Error(data.error)
    }
    return data;
  });
}

/*export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then((res) => res.json())
  .then(data => data)
}*/