class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  checkPromise(promise) {
    return promise.then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    const promise = fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return this.checkPromise(promise)
  }

  getCard() {
    const promise = fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return this.checkPromise(promise)
  }

  setUserInfo({name, about}) {
    const promise = fetch(`${this.baseUrl}/users/me`, {
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
    return this.checkPromise(promise)
  }

  addCard({name, link}) {
    const promise = fetch(`${this.baseUrl}/cards`, {
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
    return this.checkPromise(promise)
  }

  deleteCard(id) {
    const promise = fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return this.checkPromise(promise)
  }

  changeLikeCardStatus(id, isLiked) {
    const promise = fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    return this.checkPromise(promise)
  }

  setUserAvatar(data) {
    const promise = fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
    return this.checkPromise(promise)
  }
}

export const api = new Api({
  baseUrl: "https://api.marina.nomoredomains.sbs",
});
