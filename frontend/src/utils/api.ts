import {CardModel} from '../models/CardModel';
import {REACT_APP_API_BASE_PATH} from "../config";
import {ApiError} from "../models/ApiError";
import {json_or_error} from "./helpers";


class Api {
    private _baseUrl: string;
    private readonly _headers: HeadersInit;

    constructor({baseUrl, headers}: any) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _request(path: string, options: RequestInit | undefined = undefined) {
        options = {
            ...options,
            headers: {...options?.headers, ...this._headers},
            credentials: 'include'
        };
        return fetch(`${this._baseUrl}/${path}`, options)
            .then(json_or_error);
    }

    getUserInfo() {
        const path = 'users/me';
        return this._request(path);
    }

    patchUserInfo(data: any) {
        const path = 'users/me';
        return this._request(path, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    patchUserAvatar(data: any) {
        const path = `users/me/avatar`;
        return this._request(path, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    getCards() {
        const path = 'cards';
        return this._request(path, {});
    }

    postCard(data: CardModel) {
        const path = 'cards';
        return this._request(path, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    deleteCard(cardId: string) {
        const path = `cards/${cardId}`;
        return this._request(path, {
            method: 'DELETE'
        });
    }

    changeLikeCardStatus(cardId: string | undefined, isLiked: boolean) {
        if (isLiked) {
            return this._putLike(cardId);
        } else {
            return this._deleteLike(cardId);
        }
    }

    _putLike(cardId: string | undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'PUT'
        });
    }

    _deleteLike(cardId: string | undefined) {
        const path = `cards/${cardId}/likes`;
        return this._request(path, {
            method: 'DELETE'
        });
    }
}

const api = new Api({
    baseUrl: REACT_APP_API_BASE_PATH,
});

export {api};
