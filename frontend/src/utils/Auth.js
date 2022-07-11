export const BASE_URL = "https://api.marina.nomoredomains.sbs";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Все сломалось:( ${res.status}`);
};

export const register = (email, password) => {
  console.log("in auth-register:", email, password);
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    // credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    // credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(checkResponse)
};

export const checkToken = (token) => {
  console.log("in auth-checkToken", token);
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    // credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  })
    .then(checkResponse)
};