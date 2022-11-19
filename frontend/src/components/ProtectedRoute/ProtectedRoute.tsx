import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {Router} from "../../router";

const ProtectedRoute: React.FC = () => {
    const {user} = useAuth();

    return user ? <Outlet/> : <Navigate to={Router.LOGIN}/>
};


export {ProtectedRoute};
