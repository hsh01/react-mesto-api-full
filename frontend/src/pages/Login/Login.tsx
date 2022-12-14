import * as React from 'react';
import {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {Header} from '../../components/Header';
import {SignForm} from '../../components/SignForm';
import {Input} from '../../components/Input';
import {Link, useNavigate} from 'react-router-dom';
import {Router} from '../../router';
import {InfoTooltip} from '../../components/InfoTooltip';
import {useFormAndValidation} from '../../hooks/useFormAndValidation';
import {useAuth} from "../../contexts/AuthContext";
import {ApiError} from "../../models/ApiError";

const Login: FunctionComponent = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const {values, handleChange, errors, setErrors, isValid, resetForm} = useFormAndValidation();

    const {login} = useAuth();

    const initialValues = useMemo(() => {
        return {email: '', password: ''};
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        resetForm(initialValues);
    }, [resetForm, initialValues]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        return login({email: values.email, password: values.password})
            .then(() => navigate(Router.HOME))
            .catch((err: ApiError) => {
                setErrorMessage(err.body.message ?? err.toString());
                setShowErrorPopup(true);
                return Promise.reject(err);
            });
    };

    const handleCloseError = () => {
        setShowErrorPopup(false);
    };

    return (
        <>
            <Header
                menu={
                    <Link className='header__menu-item' to={Router.REGISTER}>
                        Регистрация
                    </Link>
                }
            />
            <SignForm name='login' title='Вход' onSubmit={handleSubmit} buttonDisabled={!isValid} setErrors={setErrors}>
                <fieldset className='form__set'>
                    <Input
                        title='Email'
                        name='email'
                        type='email'
                        onChange={handleChange}
                        error={errors.email}
                        value={values.email}
                        required={true}
                        dark={true}
                    />
                    <Input
                        title='Пароль'
                        name='password'
                        type='password'
                        minLength={8}
                        onChange={handleChange}
                        error={errors.password}
                        value={values.password}
                        required={true}
                        dark={true}
                    />
                </fieldset>
            </SignForm>
            <InfoTooltip type='error' isOpen={showErrorPopup} onClose={handleCloseError} message={errorMessage}/>
        </>
    );
};

export {Login};
