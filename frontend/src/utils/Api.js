export default class Api {
  constructor({url }) {
    this._url = url;
  }

  _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
  }

  _makeRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //данные с сервера о профиле
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._makeRequest);
  }

  //данные с сервера о карточках
  getCard() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._makeRequest);
  }

  //отправка данных профиля
  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._makeRequest);
  }

  //отправка данных карты
  addCard(data) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._makeRequest);
  }

  //удаление карточек
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._makeRequest);
  }

//добавленеи, удаление лайков
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then(this._makeRequest);
  }

  //отправка данных аватарки
  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._makeRequest);
  }
}

export const api = new Api({
  url: "api.marina.nomoredomains.sbs",
  headers: {
    // authorization: "143aa2a9-cefa-4929-a9d6-e76e666a89c9",
    "Content-Type": "application/json",
  },
});
