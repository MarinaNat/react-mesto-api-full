export const BASE_URL = "https://api.marina.nomoredomains.sbs";


function checkResponse(promise) {
  return promise.then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const register = (email, password) => {
  console.log("in auth-register:", email, password);
  const promise = fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(promise);
};

export const authorize = (email, password) => {
  const promise = fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return checkResponse(promise);
};

export const checkToken = (token) => {
  console.log("in auth-checkToken", token);
  const promise = fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  return checkResponse(promise);
};