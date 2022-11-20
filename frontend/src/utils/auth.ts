import {REACT_APP_API_BASE_PATH} from "../config";
import {json_or_error} from "./helpers";

export const register = (email: string, password: string) => {
    return fetch(`${REACT_APP_API_BASE_PATH}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(json_or_error);
};

export const authorize = (email: string, password: string) => {
    return fetch(`${REACT_APP_API_BASE_PATH}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then(json_or_error);
};


export const logout = () => {
    return fetch(`${REACT_APP_API_BASE_PATH}/signout`, {
        method: 'POST',
        credentials: 'include',
    })
        .then(json_or_error);
};
