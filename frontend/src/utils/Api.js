class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }

  getCard() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }

  setUserInfo({name, about}) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }

  addCard({name, link}) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name,
        link
      })
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }

  setUserAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
        .then((res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then((res) => res)
        .catch(e => console.log(e))
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
});
