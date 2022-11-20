import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as auth from "../utils/auth";
import {Router} from "../router";
import {UserModel} from "../models/UserModel";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {api} from "../utils/api";


interface AuthContextInterface {
    user: UserModel | null;
    setUser: (user: UserModel) => void;
    login: (user: { email: string, password: string }, callback?: VoidFunction) => any;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextInterface>(null!);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage("user", undefined);

    function checkAuth() {
        api.getUserInfo()
            .then((res) => {
                if (res) {
                    setUser(res);
                    navigate(Router.HOME, {replace: true});
                }
            })
            .catch((err) => {
                if (err.status === 401) {
                    logout();
                }
            });
    }

    useEffect(() => {
        checkAuth();
    }, []);

    const login = (user: { email: string, password: string }) => {
        return auth.authorize(user.email, user.password)
            .then((res) => {
                checkAuth();
                navigate(Router.HOME, {replace: true});
            });
    };

    const logout = () => {
        auth.logout()
            .finally(() => {
                setUser(undefined);
                localStorage.removeItem('user');
                navigate(Router.LOGIN, {replace: true});
            });
    };

    const value = useMemo(
        () => ({
            user,
            setUser,
            login,
            logout
        }),
        [user]
    );
    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

export const useAuth = () => React.useContext(AuthContext);