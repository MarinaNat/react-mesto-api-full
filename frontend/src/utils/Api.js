export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;

  }

  getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${token}`,
      ...this.headers,
    };
  }

  makeRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //данные с сервера о профиле
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then(this.makeRequest);
  }

  //данные с сервера о карточках
  getCard() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.getHeaders(),
    }).then(this.makeRequest);
  }

  //отправка данных профиля
  setUserInfo(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this.makeRequest);
  }

  //отправка данных карты
  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        link
      })
    }).then(this.makeRequest);
  }

  //удаление карточек
  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then(this.makeRequest);
  }

  //добавленеи, удаление лайков
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this.getHeaders(),
    }).then(this.makeRequest);
  }

  //отправка данных аватарки
  setUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.makeRequest);
  }
}

export const api = new Api({
  baseUrl: "https://api.marina.nomoredomains.sbs",
  headers: {
    // authorization: "143aa2a9-cefa-4929-a9d6-e76e666a89c9",
    "Content-Type": "application/json",
  },
});
