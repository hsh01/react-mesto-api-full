import {REACT_APP_API_BASE_PATH} from "../config";

export const register = (email: string, password: string) => {
    let resStatus = 0;
    return fetch(`${REACT_APP_API_BASE_PATH}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    })
        .then((res) => {
            resStatus = res.status;
            return res.json();
        })
        .then((data) => {
            console.log(data);
            switch (resStatus) {
                case 201:
                    return data;
                case 400:
                    if (data.error) throw data.error;
                    if (data.message) throw data.message;
                    return Promise.reject();
                default:
                    return Promise.reject();
            }
        });
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
    });
};


export const logout = () => {
    return fetch(`${REACT_APP_API_BASE_PATH}/signout`, {
        method: 'POST',
        credentials: 'include',
    });
};
