import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute';
import {Home} from '../pages/Home';
import {Register} from '../pages/Register';
import {Login} from '../pages/Login';
import {Router} from '../router';
import {AuthProvider} from "../contexts/AuthContext";

const App = () => {

    return (
        <AuthProvider>
            <Routes>
                <Route path={Router.REGISTER} element={<Register/>}/>
                <Route path={Router.LOGIN} element={<Login/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path={Router.HOME} element={<Home/>}/>
                </Route>
            </Routes>
        </AuthProvider>
    );
};

export default App;
