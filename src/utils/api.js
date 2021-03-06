const baseUrl = "https://mesto.nomoreparties.co/v1"
const authBaseUrls = "https://auth.nomoreparties.co"
const token = "9ad1e080-1a79-46ff-ac94-314e35adb97f"
const group = "cohort-16"

const queryHandler = (res) => {
    if(res.ok) {
        return res.json()
    }
    else {
        return Promise.reject(`Ошибка:${res.status}  ${res.statusText} `)
    }
}


class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._authBaseUrls = options.authBaseUrls
        this.headers = {
            authorization :options.token,
            "Content-Type": 'application/json'
        }
    }





    apiLike(card_id, isLiked) {
        return fetch(`${this._baseUrl}/cards/likes/${card_id}`, {
            headers: this.headers,
            method: isLiked ? 'PUT': 'DELETE',
        }).then(res => queryHandler(res))
    }

    delCard(card_id) {
        return fetch(`${this._baseUrl}/cards/${card_id}`, {
            headers: this.headers,
            method: 'DELETE',
        }).then(res => queryHandler(res))
    }


    setCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => queryHandler(res))
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this.headers,
        }).then(res => queryHandler(res))
    }

    setAvatarInfo(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(res => queryHandler(res))
    }


    setProfileInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this.headers,
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(res => queryHandler(res))
    }


    getProfileInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this.headers,

        }).then(res => queryHandler(res))
    }
}

class AuthApi {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._authBaseUrls = options.authBaseUrls
        this.headers = {
            "Content-Type": 'application/json'
        }
    }

    setToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`
    }

    signUp(data) {
        return fetch(`${this._authBaseUrls}/signup`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => queryHandler(res))
    }

    signIn(data) {
        return fetch(`${this._authBaseUrls}/signin`, {
            headers: this.headers,
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => queryHandler(res))
    }

    checkToken(token) {
        this.setToken(token)
        return fetch(`${this._authBaseUrls}/users/me`, {
            headers: this.headers,
            method: 'GET',
        }).then(res => queryHandler(res))
    }
}

export const api = new Api({baseUrl: `${baseUrl}/${group}`, token: token})
export const authApi = new AuthApi({authBaseUrls: authBaseUrls})

